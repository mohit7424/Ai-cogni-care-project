export type UserRole = 'caregiver' | 'doctor' | 'patient' | 'admin';

export type OtpPurpose = 'email_verification' | 'password_reset' | 'login_2fa';

export interface UserDTO {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  avatarUrl?: string | null;
  googleId?: string | null;
  createdAt: Date;
  updatedAt?: Date;
}

export interface AuthUserPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterDTO {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface LoginDTO {
  email: string;
  password?: string;
}

export interface VerifyOtpDTO {
  email: string;
  otp: string;
  purpose?: OtpPurpose;
}

export interface ResendOtpDTO {
  email: string;
  purpose?: OtpPurpose;
}

export interface ForgotPasswordDTO {
  email: string;
}

export interface ResetPasswordDTO {
  token: string; // can be OTP code or token
  newPassword?: string;
  confirmPassword?: string;
}

export interface ChangePasswordDTO {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

