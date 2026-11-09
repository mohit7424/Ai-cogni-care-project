import { authService } from './authService';
import type { RegisterRequest, RegisterResponse } from '../types/register.types';
import type { ApiResponse } from '../types/auth.types';

/**
 * Registers a new user account.
 * TODO: Integrate with real backend endpoint POST /auth/register
 */
export async function register(
  data: RegisterRequest
): Promise<ApiResponse<RegisterResponse>> {
  // TODO: Replace stub with real API call
  return authService.post<RegisterResponse>('/auth/register', data);
}

/**
 * Resends the email verification link to the user.
 * TODO: Integrate with real backend endpoint POST /auth/resend-verification
 */
export async function resendVerification(
  email: string
): Promise<ApiResponse<{ message: string }>> {
  // TODO: Replace stub with real API call
  return authService.post<{ message: string }>(
    '/auth/resend-verification',
    { email }
  );
}

/**
 * Verifies a user's email using the token sent to their email.
 * TODO: Integrate with real backend endpoint POST /auth/verify-email
 */
export async function verifyEmail(
  token: string
): Promise<ApiResponse<{ message: string }>> {
  // TODO: Replace stub with real API call
  return authService.post<{ message: string }>(
    '/auth/verify-email',
    { token }
  );
}
