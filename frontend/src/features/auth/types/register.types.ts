import type { UserRole } from './auth.types';

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  agreeToTerms: boolean;
}

export interface RegisterResponse {
  userId: string;
  email: string;
  message: string;
  requiresVerification: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}
