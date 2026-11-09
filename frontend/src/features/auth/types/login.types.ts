export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: import('./auth.types').AuthUser;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}
