'use client';

import { useState, useCallback } from 'react';
import type { RegisterFormData } from '../types/register.types';
import type { AuthStatus, UserRole } from '../types/auth.types';
import { register } from '../services/registerService';

interface RegisterFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  agreeToTerms?: string;
  general?: string;
}

interface UseRegisterReturn {
  formData: RegisterFormData;
  errors: RegisterFormErrors;
  status: AuthStatus;
  handleChange: (field: keyof RegisterFormData, value: string | boolean | UserRole) => void;
  handleSubmit: (onSuccess?: (email: string) => void) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: RegisterFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'patient',
  agreeToTerms: false,
};

function validateRegisterForm(data: RegisterFormData): RegisterFormErrors {
  const errors: RegisterFormErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = 'First name is required.';
  } else if (data.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters.';
  }

  if (!data.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  } else if (data.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters.';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.password) {
    errors.password = 'Password is required.';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(data.password)) {
    errors.password = 'Password must contain at least one uppercase letter and one number.';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (!data.role) {
    errors.role = 'Please select a role.';
  }

  if (!data.agreeToTerms) {
    errors.agreeToTerms = 'You must agree to the Terms of Service to continue.';
  }

  return errors;
}

export function useRegister(): UseRegisterReturn {
  const [formData, setFormData] = useState<RegisterFormData>(initialFormData);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [status, setStatus] = useState<AuthStatus>('idle');

  const handleChange = useCallback(
    (field: keyof RegisterFormData, value: string | boolean | UserRole) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (errors[field as keyof RegisterFormErrors]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (onSuccess?: (email: string) => void): Promise<void> => {
      const validationErrors = validateRegisterForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setStatus('loading');
      setErrors({});

      try {
        await register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });
        setStatus('success');
        onSuccess?.(formData.email);
      } catch (err) {
        const message =
          (err as { message?: string })?.message ?? 'Registration failed. Please try again.';
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
