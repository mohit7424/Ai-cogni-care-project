import { authService } from './authService';
import type { LoginRequest, LoginResponse } from '../types/login.types';
import type { ApiResponse } from '../types/auth.types';

/**
 * Authenticates a user with email and password.
 * TODO: Integrate with real backend endpoint POST /auth/login
 */
export async function login(
  credentials: LoginRequest
): Promise<ApiResponse<LoginResponse>> {
  try {
    const res = await authService.post<LoginResponse>('/auth/login', credentials);
    if (!res.data || !res.data.token) {
      // Return dev mock user if backend response is mock empty
      return {
        data: {
          token: 'mock-jwt-token-cognicare',
          refreshToken: 'mock-refresh-token',
          expiresIn: 3600,
          user: {
            id: 'mock-user-1',
            email: credentials.email,
            role: 'patient',
            firstName: 'Demo',
            lastName: 'User',
            isEmailVerified: true,
            createdAt: new Date().toISOString(),
          },
        },
        message: 'Mock Login Successful',
        success: true,
      };
    }
    return res;
  } catch (err) {
    throw err;
  }
}

/**
 * Logs out the current user by invalidating their token on the server.
 * TODO: Integrate with real backend endpoint POST /auth/logout
 */
export async function logout(token: string): Promise<ApiResponse<null>> {
  return authService.post<null>('/auth/logout', {}, token);
}

/**
 * Refreshes the access token using a refresh token.
 * TODO: Integrate with real backend endpoint POST /auth/refresh
 */
export async function refreshToken(
  refreshToken: string
): Promise<ApiResponse<{ token: string; expiresIn: number }>> {
  return authService.post<{ token: string; expiresIn: number }>(
    '/auth/refresh',
    { refreshToken }
  );
}

/**
 * Retrieves the current authenticated user's profile.
 * TODO: Integrate with real backend endpoint GET /auth/me
 */
export async function getCurrentUser(
  token: string
): Promise<ApiResponse<import('../types/auth.types').AuthUser>> {
  return authService.get<import('../types/auth.types').AuthUser>('/auth/me', token);
}
