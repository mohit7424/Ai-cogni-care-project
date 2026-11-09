'use client';

import { useState, useCallback } from 'react';
import type { LoginFormData } from '../types/login.types';
import type { AuthStatus } from '../types/auth.types';
import { login } from '../services/loginService';

interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface UseLoginReturn {
  formData: LoginFormData;
  errors: LoginFormErrors;
  status: AuthStatus;
  handleChange: (field: keyof LoginFormData, value: string | boolean) => void;
  handleSubmit: (onSuccess?: () => void) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: LoginFormData = {
  email: '',
  password: '',
  rememberMe: false,
};

function validateLoginForm(data: LoginFormData): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.password) {
    errors.password = 'Password is required.';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  return errors;
}

export function useLogin(): UseLoginReturn {
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [status, setStatus] = useState<AuthStatus>('idle');

  const handleChange = useCallback(
    (field: keyof LoginFormData, value: string | boolean) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      // Clear field error on change
      if (errors[field as keyof LoginFormErrors]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (onSuccess?: () => void): Promise<void> => {
      const validationErrors = validateLoginForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setStatus('loading');
      setErrors({});

      try {
        // TODO: Connect to auth context or store token globally
        await login({ email: formData.email, password: formData.password });
        setStatus('success');
        onSuccess?.();
      } catch (err) {
        const message =
          (err as { message?: string })?.message ?? 'Login failed. Please check your credentials.';
        setErrors({ general: message });
        setStatus('error');
      }
    },
    [formData]
  );

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setStatus('idle');
  }, []);

  return { formData, errors, status, handleChange, handleSubmit, resetForm };
}
