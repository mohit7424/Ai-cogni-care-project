'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useResetPassword } from '../hooks/useResetPassword';
import AuthLogo from '../components/AuthLogo';
import { Button, PasswordInput } from '@/components/common';
import PasswordStrength from '../components/PasswordStrength';

interface ResetPasswordScreenProps {
  token: string;
}

export default function ResetPasswordScreen({ token }: ResetPasswordScreenProps) {
  const router = useRouter();
  const { formData, errors, status, tokenStatus, isComplete, handleChange, handleSubmit } =
    useResetPassword(token);

  const isLoading = status === 'loading';

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void handleSubmit(() => {
      setTimeout(() => router.push('/auth/login'), 2000);
    });
  }

  // Token validating state
  if (tokenStatus === 'validating') {
    return (
      <div className="min-h-screen bg-[#ecf7f5] flex items-center justify-center p-4 font-sans">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <svg className="animate-spin w-8 h-8 text-[#0d9488]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-xs font-medium">Validating your reset link…</p>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (tokenStatus === 'invalid') {
    return (
      <div className="min-h-screen bg-[#ecf7f5] flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-[460px] bg-white rounded-3xl shadow-xl shadow-teal-900/5 border border-teal-50 p-7 sm:p-8 text-center">
          <div className="flex justify-center mb-6">
            <AuthLogo size="md" />
          </div>
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 text-red-500 mx-auto mb-4">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-1.5">Link expired or invalid</h2>
          <p className="text-xs text-gray-500 mb-6">
            This password reset link has expired. Please request a new one.
          </p>
          <Link
            href="/auth/forgot-password"
            className="inline-block w-full py-2.5 px-4 bg-[#0d9488] hover:bg-[#0b8075] text-white text-xs font-semibold rounded-xl transition"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  // Success state
  if (isComplete) {
    return (
      <div className="min-h-screen bg-[#ecf7f5] flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-[460px] bg-white rounded-3xl shadow-xl shadow-teal-900/5 border border-teal-50 p-7 sm:p-8 text-center">
          <div className="flex justify-center mb-6">
            <AuthLogo size="md" />
          </div>
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-50 text-[#0d9488] mx-auto mb-4">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-1.5">Password Reset Successfully!</h2>
          <p className="text-xs text-gray-500 mb-6">
            Your password has been updated. You can now sign in with your new credentials.
          </p>
          <Link
            href="/auth/login"
            className="inline-block w-full py-2.5 px-4 bg-[#0d9488] hover:bg-[#0b8075] text-white text-xs font-semibold rounded-xl transition"
          >
            Sign In Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ecf7f5] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[460px] bg-white rounded-3xl shadow-xl shadow-teal-900/5 border border-teal-50 p-7 sm:p-8">
        <div className="flex justify-center mb-6">
          <AuthLogo size="md" />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">
            Set New <span className="text-[#0d9488]">Password</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Create a strong new password for your account.
          </p>
        </div>

        {errors.general && (
          <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <PasswordInput
            label="New password"
            name="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={e => handleChange('password', e.target.value)}
            error={errors.password}
            required
          />

          <PasswordStrength password={formData.password} />

          <PasswordInput
            label="Confirm new password"
            name="confirmPassword"
            placeholder="Repeat your new password"
            value={formData.confirmPassword}
            onChange={e => handleChange('confirmPassword', e.target.value)}
            error={errors.confirmPassword}
            required
          />

          <Button type="submit" isLoading={isLoading} fullWidth variant="primary">
            Reset Password →
          </Button>

          <div className="text-center pt-2">
            <Link
              href="/auth/login"
              className="text-xs font-medium text-gray-500 hover:text-[#0d9488] transition"
            >
              ← Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
