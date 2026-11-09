import { authService } from './authService';
import type { ApiResponse } from '../types/auth.types';

export type OTPPurpose = 'email-verification' | 'phone-verification' | 'login' | 'password-reset';

export interface SendOTPRequest {
  identifier: string; // email or phone number
  purpose: OTPPurpose;
}

export interface VerifyOTPRequest {
  identifier: string;
  otp: string;
  purpose: OTPPurpose;
}

export interface OTPResponse {
  message: string;
  expiresIn: number; // seconds until OTP expires
}

export interface VerifyOTPResponse {
  verified: boolean;
  token?: string; // session token returned on successful verification
  message: string;
}

/**
 * Sends a one-time password to the user's email or phone.
 * TODO: Integrate with real backend endpoint POST /auth/otp/send
 */
export async function sendOTP(
  data: SendOTPRequest
): Promise<ApiResponse<OTPResponse>> {
  // TODO: Replace stub with real API call
  return authService.post<OTPResponse>('/auth/otp/send', data);
}

/**
 * Verifies a one-time password submitted by the user.
 * TODO: Integrate with real backend endpoint POST /auth/otp/verify
 */
export async function verifyOTP(
  data: VerifyOTPRequest
): Promise<ApiResponse<VerifyOTPResponse>> {
  // TODO: Replace stub with real API call
  return authService.post<VerifyOTPResponse>('/auth/otp/verify', data);
}

/**
 * Resends a new one-time password to the user's email or phone.
 * TODO: Integrate with real backend endpoint POST /auth/otp/resend
 */
export async function resendOTP(
  data: SendOTPRequest
): Promise<ApiResponse<OTPResponse>> {
  // TODO: Replace stub with real API call
  return authService.post<OTPResponse>('/auth/otp/resend', data);
}
