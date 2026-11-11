import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { AuthRepository } from '../repository/authrepository.js';
import { EmailService } from '../../../services/emailservice.js';
import type {
  RegisterDTO,
  LoginDTO,
  VerifyOtpDTO,
  ResendOtpDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  UserRole,
  UserDTO,
  AuthUserPayload,
} from '../types/authtypes.js';
import type { User } from '../../../DB/schema/userschema.js';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'cognicare_access_secret_2026';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'cognicare_refresh_secret_2026';
const ACCESS_EXPIRES_IN_SEC = 15 * 60; // 15 minutes
const REFRESH_EXPIRES_IN_DAYS = 7;

export class AuthService {
  /**
   * Format DB User into clean UserDTO
   */
  private static formatUserDTO(user: User): UserDTO {
    return {
      id: user.id,
      email: user.email,
      role: user.role as UserRole,
      firstName: user.firstName,
      lastName: user.lastName,
      isEmailVerified: user.isEmailVerified,
      avatarUrl: user.avatarUrl,
      googleId: user.googleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Generate 6-digit numeric OTP code
   */
  private static generateOtpCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Hash a token string using SHA256 for secure DB storage
   */
  private static hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  /**
   * Create JWT access and refresh token pair
   */
  private static async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> {
    const payload: AuthUserPayload = {
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,
    };

    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_EXPIRES_IN_DAYS);

    await AuthRepository.createRefreshToken({
      userId: user.id,
      tokenHash: this.hashToken(refreshToken),
      expiresAt,
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: ACCESS_EXPIRES_IN_SEC,
    };
  }

  // ================= REGISTER =================

  static async register(dto: RegisterDTO) {
    const existingUser = await AuthRepository.findUserByEmail(dto.email);

    if (existingUser && existingUser.isEmailVerified) {
      throw new Error('Email is already registered. Please log in.');
    }

    const passwordHash = dto.password ? await bcrypt.hash(dto.password, 10) : null;
    let user: User;

    if (existingUser && !existingUser.isEmailVerified) {
      // Re-use unverified user and update details
      const updated = await AuthRepository.updateUser(existingUser.id, {
        firstName: dto.firstName,
        lastName: dto.lastName,
        passwordHash,
        role: dto.role || 'caregiver',
      });
      user = updated || existingUser;
    } else {
      user = await AuthRepository.createUser({
        email: dto.email,
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: dto.role || 'caregiver',
        isEmailVerified: false,
      });
    }

    // Invalidate old OTPs & generate new code
    await AuthRepository.invalidatePreviousOtps(user.email, 'email_verification');
    const otp = this.generateOtpCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await AuthRepository.createOtp({
      userId: user.id,
      email: user.email,
      otpCode: otp,
      purpose: 'email_verification',
      expiresAt,
    });

    await EmailService.sendOtpEmail(user.email, otp, 'email_verification');

    return {
      userId: user.id,
      email: user.email,
      requiresVerification: true,
    };
  }

  // ================= VERIFY OTP =================

  static async verifyOtp(dto: VerifyOtpDTO) {
    const purpose = dto.purpose || 'email_verification';
    const otpRecord = await AuthRepository.findValidOtp(dto.email, dto.otp, purpose);

    if (!otpRecord) {
      throw new Error('Invalid or expired verification code');
    }

    await AuthRepository.markOtpUsed(otpRecord.id);

    if (purpose === 'email_verification') {
      const user = await AuthRepository.findUserByEmail(dto.email);
      if (!user) throw new Error('User not found');

      const verifiedUser = (await AuthRepository.markUserEmailVerified(user.id)) || user;
      const tokens = await this.generateTokens(verifiedUser);
      await EmailService.sendWelcomeEmail(verifiedUser.email, verifiedUser.firstName);

      return {
        verified: true,
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: tokens.expiresIn,
        user: this.formatUserDTO(verifiedUser),
        message: 'Email verified successfully',
      };
    }

    return {
      verified: true,
      token: dto.otp,
      message: 'Code verified successfully',
    };
  }

  // ================= RESEND OTP =================

  static async resendOtp(dto: ResendOtpDTO) {
    const purpose = dto.purpose || 'email_verification';
    const user = await AuthRepository.findUserByEmail(dto.email);

    if (!user && purpose === 'email_verification') {
      throw new Error('No registration found for this email');
    }

    await AuthRepository.invalidatePreviousOtps(dto.email, purpose);

    const otp = this.generateOtpCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await AuthRepository.createOtp({
      userId: user ? user.id : undefined,
      email: dto.email,
      otpCode: otp,
      purpose,
      expiresAt,
    });

    await EmailService.sendOtpEmail(dto.email, otp, purpose);

    return {
      message: 'Verification code sent successfully',
      expiresIn: 600,
    };
  }

  // ================= LOGIN =================

  static async login(dto: LoginDTO) {
    const user = await AuthRepository.findUserByEmail(dto.email);
    if (!user || !user.passwordHash) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(dto.password || '', user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    if (!user.isEmailVerified) {
      // Trigger new verification OTP
      await AuthRepository.invalidatePreviousOtps(user.email, 'email_verification');
      const otp = this.generateOtpCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await AuthRepository.createOtp({
        userId: user.id,
        email: user.email,
        otpCode: otp,
        purpose: 'email_verification',
        expiresAt,
      });

      await EmailService.sendOtpEmail(user.email, otp, 'email_verification');

      const err: any = new Error('Please verify your email address to continue');
      err.requiresVerification = true;
      err.email = user.email;
      throw err;
    }

    const tokens = await this.generateTokens(user);

    return {
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.expiresIn,
      user: this.formatUserDTO(user),
    };
  }

  // ================= REFRESH TOKEN =================

  static async refreshToken(incomingRefreshToken: string) {
    if (!incomingRefreshToken) {
      throw new Error('Refresh token is required');
    }

    let payload: AuthUserPayload;
    try {
      payload = jwt.verify(incomingRefreshToken, JWT_REFRESH_SECRET) as AuthUserPayload;
    } catch {
      throw new Error('Invalid or expired refresh token');
    }

    const hashed = this.hashToken(incomingRefreshToken);
    const storedToken = await AuthRepository.findRefreshToken(hashed);
    if (!storedToken) {
      throw new Error('Refresh token has been revoked or expired');
    }

    // Revoke old refresh token (Token rotation)
    await AuthRepository.revokeRefreshToken(hashed);

    const user = await AuthRepository.findUserById(payload.userId);
    if (!user || !user.isActive) {
      throw new Error('User no longer exists or is inactive');
    }

    const tokens = await this.generateTokens(user);

    return {
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.expiresIn,
      user: this.formatUserDTO(user),
    };
  }

  // ================= LOGOUT =================

  static async logout(incomingRefreshToken?: string) {
    if (incomingRefreshToken) {
      const hashed = this.hashToken(incomingRefreshToken);
      await AuthRepository.revokeRefreshToken(hashed);
    }
    return { message: 'Logged out successfully' };
  }

  // ================= FORGOT PASSWORD =================

  static async forgotPassword(dto: ForgotPasswordDTO) {
    const user = await AuthRepository.findUserByEmail(dto.email);

    if (user) {
      await AuthRepository.invalidatePreviousOtps(user.email, 'password_reset');
      const otp = this.generateOtpCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await AuthRepository.createOtp({
        userId: user.id,
        email: user.email,
        otpCode: otp,
        purpose: 'password_reset',
        expiresAt,
      });

      await EmailService.sendOtpEmail(user.email, otp, 'password_reset');
    }

    // Return uniform message to prevent email enumeration
    return {
      message: 'If an account exists with that email, a password reset code has been sent.',
    };
  }

  // ================= VALIDATE RESET TOKEN =================

  static async validateResetToken(token: string) {
    const validOtp = await AuthRepository.findValidOtp(undefined, token, 'password_reset');
    return {
      valid: Boolean(validOtp),
      email: validOtp?.email,
    };
  }

  // ================= RESET PASSWORD =================

  static async resetPassword(dto: ResetPasswordDTO) {
    const otpCode = dto.token;
    const password = dto.newPassword || (dto as any).password;
    if (!password) {
      throw new Error('New password is required');
    }

    const email = (dto as any).email;
    const otpRecord = await AuthRepository.findValidOtp(email, otpCode, 'password_reset');

    if (!otpRecord) {
      throw new Error('Invalid or expired reset token or verification code');
    }

    const user = await AuthRepository.findUserByEmail(otpRecord.email);
    if (!user) {
      throw new Error('User account not found');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await AuthRepository.updateUserPassword(user.id, passwordHash);
    await AuthRepository.markOtpUsed(otpRecord.id);
    await AuthRepository.revokeAllUserTokens(user.id);

    return {
      message: 'Password reset successful. Please log in with your new password.',
    };
  }

  // ================= GET ME =================

  static async getMe(userId: string) {
    const user = await AuthRepository.findUserById(userId);
    if (!user) throw new Error('User not found');
    return this.formatUserDTO(user);
  }
}
