import type { Request, Response } from 'express';
import { AuthService } from '../service/authservice.js';
import {
  validateRegister,
  validateLogin,
  validateVerifyOtp,
  validateResendOtp,
  validateForgotPassword,
  validateResetPassword,
} from '../validation/authvalidation.js';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export class AuthController {
  // ================= REGISTER =================
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const validation = validateRegister(req.body);
      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validation.errors,
        });
        return;
      }

      const result = await AuthService.register(req.body);

      res.status(201).json({
        success: true,
        message: 'Account created! Verification code sent to your email.',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Registration failed',
      });
    }
  }

  // ================= VERIFY OTP =================
  static async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const validation = validateVerifyOtp(req.body);
      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validation.errors,
        });
        return;
      }

      const result = await AuthService.verifyOtp(req.body);

      if (result.refreshToken) {
        res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS);
      }

      res.status(200).json({
        success: true,
        message: result.message || 'Verification successful',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Verification failed',
      });
    }
  }

  // ================= RESEND OTP =================
  static async resendOtp(req: Request, res: Response): Promise<void> {
    try {
      const validation = validateResendOtp(req.body);
      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validation.errors,
        });
        return;
      }

      const result = await AuthService.resendOtp(req.body);

      res.status(200).json({
        success: true,
        message: result.message,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to resend code',
      });
    }
  }

  // ================= LOGIN =================
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const validation = validateLogin(req.body);
      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validation.errors,
        });
        return;
      }

      const result = await AuthService.login(req.body);

      res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error: any) {
      if (error.requiresVerification) {
        res.status(403).json({
          success: false,
          requiresVerification: true,
          message: error.message,
          data: { email: error.email },
        });
        return;
      }

      res.status(401).json({
        success: false,
        message: error.message || 'Invalid credentials',
      });
    }
  }

  // ================= REFRESH TOKEN =================
  static async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const incomingRefreshToken =
        req.cookies?.refreshToken || req.body?.refreshToken || req.headers['x-refresh-token'];

      if (!incomingRefreshToken) {
        res.status(401).json({
          success: false,
          message: 'Refresh token is required',
        });
        return;
      }

      const result = await AuthService.refreshToken(incomingRefreshToken);

      res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS);

      res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
        data: result,
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || 'Invalid refresh token',
      });
    }
  }

  // ================= LOGOUT =================
  static async logout(req: Request, res: Response): Promise<void> {
    try {
      const incomingRefreshToken =
        req.cookies?.refreshToken || req.body?.refreshToken;

      await AuthService.logout(incomingRefreshToken);
      res.clearCookie('refreshToken');

      res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Logout failed',
      });
    }
  }

  // ================= FORGOT PASSWORD =================
  static async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const validation = validateForgotPassword(req.body);
      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validation.errors,
        });
        return;
      }

      const result = await AuthService.forgotPassword(req.body);

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Error processing forgot password request',
      });
    }
  }

  // ================= VALIDATE RESET TOKEN =================
  static async validateResetToken(req: Request, res: Response): Promise<void> {
    try {
      const token = (req.query.token as string) || (req.params.token as string);
      if (!token) {
        res.status(400).json({
          success: false,
          message: 'Reset token or code is required',
        });
        return;
      }

      const result = await AuthService.validateResetToken(token);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Token validation failed',
      });
    }
  }

  // ================= RESET PASSWORD =================
  static async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const validation = validateResetPassword(req.body);
      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validation.errors,
        });
        return;
      }

      const result = await AuthService.resetPassword(req.body);

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Password reset failed',
      });
    }
  }

  // ================= GET ME =================
  static async getMe(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
        return;
      }

      const user = await AuthService.getMe(userId);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'User not found',
      });
    }
  }
}

