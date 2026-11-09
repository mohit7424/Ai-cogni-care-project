'use client';

import { useState, useCallback, useEffect } from 'react';
import type { AuthStatus } from '../types/auth.types';
import { resetPassword, validateResetToken } from '../services/passwordService';

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordErrors {
  password?: string;
  confirmPassword?: string;
  general?: string;
}

interface UseResetPasswordReturn {
  formData: ResetPasswordFormData;
  errors: ResetPasswordErrors;
  status: AuthStatus;
  tokenStatus: 'validating' | 'valid' | 'invalid';
  isComplete: boolean;
  handleChange: (field: keyof ResetPasswordFormData, value: string) => void;
  handleSubmit: (onSuccess?: () => void) => Promise<void>;
}

function validateResetForm(data: ResetPasswordFormData): ResetPasswordErrors {
  const errors: ResetPasswordErrors = {};

  if (!data.password) {
    errors.password = 'New password is required.';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(data.password)) {
    errors.password = 'Password must contain at least one uppercase letter and one number.';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your new password.';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}

export function useResetPassword(resetToken: string): UseResetPasswordReturn {
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<ResetPasswordErrors>({});
  const [status, setStatus] = useState<AuthStatus>('idle');
  const [tokenStatus, setTokenStatus] = useState<'validating' | 'valid' | 'invalid'>(
    resetToken ? 'validating' : 'invalid'
  );
  const [isComplete, setIsComplete] = useState(false);

  // Validate the reset token on mount
  useEffect(() => {
    if (!resetToken) return;

    let isMounted = true;

    async function checkToken(): Promise<void> {
      try {
        const response = await validateResetToken(resetToken);
        if (isMounted) {
          setTokenStatus(response.data.valid ? 'valid' : 'invalid');
        }
      } catch {
        if (isMounted) {
          setTokenStatus('invalid');
        }
      }
    }

    void checkToken();

    return () => {
      isMounted = false;
    };
  }, [resetToken]);

  const handleChange = useCallback(
    (field: keyof ResetPasswordFormData, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (onSuccess?: () => void): Promise<void> => {
      const validationErrors = validateResetForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setStatus('loading');
      setErrors({});

      try {
        // TODO: Connect to real API
        await resetPassword({ token: resetToken, newPassword: formData.password });
        setStatus('success');
        setIsComplete(true);
        onSuccess?.();
      } catch (err) {
        const message =
          (err as { message?: string })?.message ?? 'Failed to reset password. Please try again.';
        setErrors({ general: message });
        setStatus('error');
      }
    },
    [formData, resetToken]
  );

  return { formData, errors, status, tokenStatus, isComplete, handleChange, handleSubmit };
}
