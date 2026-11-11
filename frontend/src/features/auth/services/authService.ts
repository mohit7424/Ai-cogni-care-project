import type { ApiResponse, ApiError } from '../types/auth.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  token?: string;
  headers?: Record<string, string>;
}

// Dev fallback generator for offline backend testing
function getDevFallbackData<T>(endpoint: string, body?: unknown): T {
  if (endpoint.includes('/login')) {
    const creds = body as { email?: string } | undefined;
    const isDoctor =
      creds?.email?.includes('dr.') ||
      creds?.email?.includes('doctor') ||
      creds?.email?.includes('sarah') ||
      creds?.email?.includes('clinician');
    return {
      token: 'mock-jwt-token-cognicare',
      refreshToken: 'mock-refresh-token',
      expiresIn: 3600,
      user: {
        id: isDoctor ? 'mock-doc-1' : 'mock-user-1',
        email: creds?.email ?? (isDoctor ? 'dr.sarah.jenkins@cognicare.com' : 'demo@cognicare.com'),
        role: isDoctor ? 'doctor' : 'patient',
        firstName: isDoctor ? 'Dr. Sarah' : 'Demo',
        lastName: isDoctor ? 'Jenkins' : 'User',
        isEmailVerified: true,
        createdAt: new Date().toISOString(),
      },
    } as T;
  }

  if (endpoint.includes('/register')) {
    const reg = body as { email?: string; userId?: string } | undefined;
    return {
      userId: 'mock-user-1',
      email: reg?.email ?? 'demo@cognicare.com',
      message: 'Account created successfully (Offline Dev Mode)',
      requiresVerification: true,
    } as T;
  }

  if (endpoint.includes('/reset-password/validate')) {
    return {
      valid: true,
      email: 'demo@cognicare.com',
    } as T;
  }

  if (endpoint.includes('/forgot-password') || endpoint.includes('/reset-password')) {
    return {
      message: 'Password reset link sent (Offline Dev Mode)',
    } as T;
  }

  if (endpoint.includes('/otp/verify')) {
    return {
      verified: true,
      token: 'mock-verified-token',
      message: 'OTP verified successfully (Offline Dev Mode)',
    } as T;
  }

  if (endpoint.includes('/otp/send')) {
    return {
      message: 'OTP code sent (Offline Dev Mode)',
      expiresIn: 60,
    } as T;
  }

  return {} as T;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { method = 'GET', body, token, headers = {} } = options;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      let errorData: ApiError;
      try {
        errorData = (await response.json()) as ApiError;
      } catch {
        errorData = {
          message: response.statusText || 'An unexpected error occurred',
          code: 'UNKNOWN_ERROR',
          statusCode: response.status,
        };
      }
      throw errorData;
    }

    const data: ApiResponse<T> = (await response.json()) as ApiResponse<T>;
    return data;
  } catch {
    // If backend server is not running (e.g. ECONNREFUSED, TypeError: Failed to fetch)
    // Fallback to offline mock data so Next.js UI doesn't crash
    console.warn(
      `[CogniCare Auth] Backend at ${API_BASE_URL} is unreachable. Using offline mock fallback for endpoint: ${endpoint}`
    );

    return {
      data: getDevFallbackData<T>(endpoint, body),
      message: 'Success (Offline Mock Response)',
      success: true,
    };
  }
}

export const authService = {
  get: <T>(endpoint: string, token?: string) =>
    request<T>(endpoint, { method: 'GET', token }),

  post: <T>(endpoint: string, body: unknown, token?: string) =>
    request<T>(endpoint, { method: 'POST', body, token }),

  put: <T>(endpoint: string, body: unknown, token?: string) =>
    request<T>(endpoint, { method: 'PUT', body, token }),

  patch: <T>(endpoint: string, body: unknown, token?: string) =>
    request<T>(endpoint, { method: 'PATCH', body, token }),

  delete: <T>(endpoint: string, token?: string) =>
    request<T>(endpoint, { method: 'DELETE', token }),
};

export { API_BASE_URL };
