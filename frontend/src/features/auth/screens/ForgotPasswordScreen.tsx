'use client';

import React from 'react';
import Link from 'next/link';
import { useForgotPassword } from '../hooks/useForgotPassword';
import AuthLogo from '../components/AuthLogo';
import { Button, TextInput } from '@/components/common';

export default function ForgotPasswordScreen() {
  const { email, errors, status, isSubmitted, handleEmailChange, handleSubmit } =
    useForgotPassword();

  const isLoading = status === 'loading';

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void handleSubmit();
  }

  return (
    <div className="min-h-screen bg-[#ecf7f5] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[460px] bg-white rounded-3xl shadow-xl shadow-teal-900/5 border border-teal-50 p-7 sm:p-8">
        <div className="flex justify-center mb-6">
          <AuthLogo size="md" />
        </div>

        {isSubmitted ? (
          <div className="text-center">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-50 text-[#0d9488] mx-auto mb-4">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1.5">Check your inbox</h2>
            <p className="text-xs text-gray-500 mb-2">We sent a reset link to</p>
            <p className="text-xs font-semibold text-[#0d9488] mb-5">{email}</p>
            <Link
              href="/auth/login"
              className="inline-block w-full py-2.5 px-4 bg-[#0d9488] hover:bg-[#0b8075] text-white text-xs font-semibold rounded-xl transition text-center"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-gray-800">
                Forgot your <span className="text-[#0d9488]">Password?</span>
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Enter your registered email address and we&apos;ll send a link to reset your password.
              </p>
            </div>

            {errors.general && (
              <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <TextInput
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => handleEmailChange(e.target.value)}
                error={errors.email}
                required
                leftIcon={
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                }
              />

              <Button
                type="submit"
                isLoading={isLoading}
                fullWidth
                variant="primary"
              >
                Send Reset Link &rarr;
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/auth/login"
                  className="text-xs font-semibold text-gray-500 hover:text-[#0d9488] transition"
                >
                  &larr; Back to Sign In
                </Link>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
