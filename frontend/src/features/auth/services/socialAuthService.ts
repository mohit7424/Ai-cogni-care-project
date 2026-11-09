import { authService } from './authService';
import type { ApiResponse } from '../types/auth.types';
import type { LoginResponse } from '../types/login.types';

export interface GoogleSignInResponse {
  authUrl: string;
}

export interface GoogleCallbackRequest {
  code: string;
  state?: string;
}

/**
 * Initiates the Google OAuth sign-in flow by retrieving the OAuth redirect URL.
 * TODO: Integrate with real backend endpoint GET /auth/google
 */
export async function googleSignIn(): Promise<ApiResponse<GoogleSignInResponse>> {
  // TODO: Replace stub with real API call
  // The backend should return a Google OAuth URL to redirect the user to
  return authService.get<GoogleSignInResponse>('/auth/google');
}

/**
 * Handles the Google OAuth callback and exchanges the code for auth tokens.
 * TODO: Integrate with real backend endpoint POST /auth/google/callback
 */
export async function googleCallback(
  data: GoogleCallbackRequest
): Promise<ApiResponse<LoginResponse>> {
  // TODO: Replace stub with real API call
  return authService.post<LoginResponse>('/auth/google/callback', data);
}

/**
 * Initiates a redirect to Google sign-in.
 * Call this from the frontend when the user clicks the Google sign-in button.
 * TODO: Adjust redirect URL to match your deployed environment
 */
export function initiateGoogleSignIn(): void {
  // TODO: Replace with real Google OAuth redirect URL from backend
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
  const googleAuthUrl = new URL('/auth/google', baseUrl).toString();
  window.location.assign(googleAuthUrl);
}
