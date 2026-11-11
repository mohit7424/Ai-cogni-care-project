export type UserRole = 'patient' | 'doctor' | 'admin';
export type AuthStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  status: AuthStatus;
  error: string | null;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  avatar?: string;
  isEmailVerified: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
}
