import { authService } from './authService';
import type { ApiResponse } from '../types/auth.types';

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

/**
 * Initiates the password reset flow by sending a reset link to the user's email.
 * TODO: Integrate with real backend endpoint POST /auth/forgot-password
 */
export async function forgotPassword(
  data: ForgotPasswordRequest
): Promise<ApiResponse<{ message: string }>> {
  // TODO: Replace stub with real API call
  return authService.post<{ message: string }>('/auth/forgot-password', data);
}

/**
 * Resets the user's password using the token from the email link.
 * TODO: Integrate with real backend endpoint POST /auth/reset-password
 */
export async function resetPassword(
  data: ResetPasswordRequest
): Promise<ApiResponse<{ message: string }>> {
  // TODO: Replace stub with real API call
  return authService.post<{ message: string }>('/auth/reset-password', data);
}

/**
 * Changes the authenticated user's current password.
 * TODO: Integrate with real backend endpoint POST /auth/change-password
 */
export async function changePassword(
  data: ChangePasswordRequest,
  token: string
): Promise<ApiResponse<{ message: string }>> {
  // TODO: Replace stub with real API call
  return authService.post<{ message: string }>(
    '/auth/change-password',
    data,
    token
  );
}

/**
 * Validates a password reset token to check if it's still valid.
 * TODO: Integrate with real backend endpoint GET /auth/reset-password/validate
 */
export async function validateResetToken(
  token: string
): Promise<ApiResponse<{ valid: boolean; email: string }>> {
  // TODO: Replace stub with real API call
  return authService.post<{ valid: boolean; email: string }>(
    '/auth/reset-password/validate',
    { token }
  );
}
