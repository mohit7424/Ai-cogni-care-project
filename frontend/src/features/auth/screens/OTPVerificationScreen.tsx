'use client';

import React from 'react';
import Link from 'next/link';
import { useOTPVerification } from '../hooks/useOTPVerification';
import AuthLogo from '../components/AuthLogo';
import { Button } from '@/components/common';
import type { OTPPurpose } from '../services/otpService';

interface OTPVerificationScreenProps {
  identifier: string; // email or phone
  purpose: OTPPurpose;
  onSuccess?: () => void;
}

export default function OTPVerificationScreen({
  identifier,
  purpose,
  onSuccess,
}: OTPVerificationScreenProps) {
  const {
    otp,
    status,
    error,
    countdown,
    canResend,
    inputRefs,
    handleOTPChange,
    handleKeyDown,
    handlePaste,
    handleVerify,
    handleResend,
  } = useOTPVerification(identifier, purpose);

  const isLoading = status === 'loading';

  function handleVerifyClick() {
    void handleVerify(onSuccess);
  }

  function handleResendClick() {
    void handleResend();
  }

  const isEmail = identifier.includes('@');
  const maskedIdentifier = isEmail
    ? identifier.replace(/(.{2}).+(@.+)/, '$1•••$2')
    : identifier.replace(/.(?=.{4})/g, '•');

  return (
    <div className="min-h-screen bg-[#ecf7f5] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[460px] bg-white rounded-3xl shadow-xl shadow-teal-900/5 border border-teal-50 p-7 sm:p-8">
        <div className="flex justify-center mb-6">
          <AuthLogo size="md" />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">
            Verify Your <span className="text-[#0d9488]">Identity</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
            We sent a 6-digit code to{' '}
            <span className="font-semibold text-gray-700">{maskedIdentifier}</span>. Enter it below to continue.
          </p>
        </div>

        {/* OTP Input Boxes */}
        <div
          className="flex justify-center gap-2.5 sm:gap-3 mb-6"
          role="group"
          aria-label="One-time password input"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]"
              maxLength={1}
              value={digit}
              onChange={e => handleOTPChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              aria-label={`Digit ${index + 1} of 6`}
              disabled={isLoading}
              className={[
                'w-11 sm:w-12 h-13 sm:h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition duration-150 bg-white',
                'caret-[#0d9488] text-gray-900',
                digit ? 'border-[#0d9488] bg-teal-50/40' : 'border-gray-200 hover:border-gray-300',
                error ? 'border-red-400 bg-red-50' : '',
                'focus:border-[#0d9488] focus:ring-2 focus:ring-teal-100',
                isLoading ? 'opacity-60 cursor-not-allowed' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            />
          ))}
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl p-3 text-center">
            {error}
          </div>
        )}

        {/* Verify Button */}
        <Button
          type="button"
          onClick={handleVerifyClick}
          isLoading={isLoading}
          fullWidth
          variant="primary"
        >
          Verify Code &rarr;
        </Button>

        {/* Resend Section */}
        <div className="mt-5 flex flex-col items-center gap-1.5 text-center">
          {canResend ? (
            <button
              type="button"
              onClick={handleResendClick}
              className="text-xs font-semibold text-[#0d9488] hover:underline"
            >
              Resend verification code
            </button>
          ) : (
            <p className="text-xs text-gray-500">
              Resend code in{' '}
              <span className="font-semibold text-[#0d9488] tabular-nums">
                {countdown}s
              </span>
            </p>
          )}

          <p className="text-[11px] text-gray-400">
            Check your spam folder if you don&apos;t receive it.
          </p>

          <div className="pt-2">
            <Link
              href="/auth/login"
              className="text-xs text-gray-500 hover:text-[#0d9488] font-medium"
            >
              &larr; Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
