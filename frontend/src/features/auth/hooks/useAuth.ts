'use client';

import { useState, useCallback } from 'react';
import type { AuthState, AuthUser } from '../types/auth.types';
import type { LoginRequest, LoginResponse } from '../types/login.types';
import type { RegisterRequest, RegisterResponse } from '../types/register.types';
import { login, logout as logoutService } from '../services/loginService';
import { register as registerService } from '../services/registerService';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  const loginAction = useCallback(async (credentials: LoginRequest): Promise<LoginResponse | null> => {
    setAuthState(prev => ({ ...prev, status: 'loading', error: null }));
    try {
      // TODO: Persist token in localStorage/cookie based on rememberMe
      const response = await login(credentials);
      const { token, user } = response.data;

      setAuthState({
        isAuthenticated: true,
        user,
        token,
        status: 'success',
        error: null,
      });

      // TODO: Store token securely (httpOnly cookie preferred)
      if (typeof window !== 'undefined') {
        localStorage.setItem('cognicare_token', token);
      }

      return response.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : (err as { message?: string })?.message ?? 'Login failed. Please try again.';

      setAuthState(prev => ({
        ...prev,
        status: 'error',
        error: errorMessage,
      }));
      return null;
    }
  }, []);

  const registerAction = useCallback(async (data: RegisterRequest): Promise<RegisterResponse | null> => {
    setAuthState(prev => ({ ...prev, status: 'loading', error: null }));
    try {
      const response = await registerService(data);
      setAuthState(prev => ({ ...prev, status: 'success', error: null }));
      return response.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : (err as { message?: string })?.message ?? 'Registration failed. Please try again.';

      setAuthState(prev => ({
        ...prev,
        status: 'error',
        error: errorMessage,
      }));
      return null;
    }
  }, []);

  const logoutAction = useCallback(async (): Promise<void> => {
    const token = authState.token;
    setAuthState(prev => ({ ...prev, status: 'loading' }));
    try {
      if (token) {
        // TODO: Notify backend to invalidate token
        await logoutService(token);
      }
    } catch {
      // Silently fail — still clear local state
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cognicare_token');
      }
      setAuthState(initialState);
    }
  }, [authState.token]);

  const setUser = useCallback((user: AuthUser | null) => {
    setAuthState(prev => ({
      ...prev,
      user,
      isAuthenticated: !!user,
    }));
  }, []);

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...authState,
    login: loginAction,
    register: registerAction,
    logout: logoutAction,
    setUser,
    clearError,
  };
}
