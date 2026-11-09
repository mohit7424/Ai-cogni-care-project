'use client';

import { useState, useCallback } from 'react';
import type { AuthStatus } from '../types/auth.types';
import { forgotPassword } from '../services/passwordService';

interface ForgotPasswordErrors {
  email?: string;
  general?: string;
}

interface UseForgotPasswordReturn {
  email: string;
  errors: ForgotPasswordErrors;
  status: AuthStatus;
  isSubmitted: boolean;
  handleEmailChange: (value: string) => void;
  handleSubmit: () => Promise<void>;
  resetState: () => void;
}

function validateEmail(email: string): string | undefined {
  if (!email.trim()) return 'Email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address.';
  return undefined;
}

export function useForgotPassword(): UseForgotPasswordReturn {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<ForgotPasswordErrors>({});
  const [status, setStatus] = useState<AuthStatus>('idle');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  }, [errors.email]);

  const handleSubmit = useCallback(async (): Promise<void> => {
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setStatus('loading');
    setErrors({});

    try {
      // TODO: Connect to real API
      await forgotPassword({ email });
      setStatus('success');
      setIsSubmitted(true);
    } catch (err) {
      const message =
        (err as { message?: string })?.message ?? 'Failed to send reset link. Please try again.';
      setErrors({ general: message });
      setStatus('error');
    }
  }, [email]);

  const resetState = useCallback(() => {
    setEmail('');
    setErrors({});
    setStatus('idle');
    setIsSubmitted(false);
  }, []);

  return { email, errors, status, isSubmitted, handleEmailChange, handleSubmit, resetState };
}
