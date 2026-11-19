'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLogo from '../components/AuthLogo';
import { Button, TextInput, PasswordInput } from '@/components/common';
import PasswordStrength from '../components/PasswordStrength';
import { forgotPassword, validateResetToken, resetPassword } from '../services/passwordService';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

export default function ForgotPasswordScreen() {
  const router = useRouter();

  // Step state: 1 = Email, 2 = OTP, 3 = New Password, 4 = Success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form values
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const [canResend, setCanResend] = useState(false);

  // Refs for 6-digit OTP inputs
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(OTP_LENGTH).fill(null));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Manage resend countdown
  useEffect(() => {
    if (step === 2) {
      startCountdown();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step]);

  function startCountdown() {
    setCountdown(RESEND_COOLDOWN);
    setCanResend(false);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  // ----------------------------------------------------
  // STEP 1: Submit Email to get 6-digit Reset OTP
  // ----------------------------------------------------
  async function handleSendEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await forgotPassword({ email: email.trim() });
      setStep(2);
      setTimeout(() => inputRefs.current[0]?.focus(), 150);
    } catch (err: unknown) {
      setErrorMessage((err as { message?: string })?.message || 'Failed to send reset code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  // ----------------------------------------------------
  // STEP 2: OTP Input Handlers & Validation
  // ----------------------------------------------------
  function handleOtpChange(index: number, val: string) {
    const digit = val.replace(/\D/g, '').slice(-1);
    const updated = [...otp];
    updated[index] = digit;
    setOtp(updated);
    setErrorMessage(null);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const updated = [...otp];
        updated[index - 1] = '';
        setOtp(updated);
        inputRefs.current[index - 1]?.focus();
      } else {
        const updated = [...otp];
        updated[index] = '';
        setOtp(updated);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;

    const updated = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((char, i) => {
      updated[i] = char;
    });
    setOtp(updated);

    const nextEmpty = updated.findIndex(d => !d);
    const focusIndex = nextEmpty === -1 ? OTP_LENGTH - 1 : nextEmpty;
    inputRefs.current[focusIndex]?.focus();
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < OTP_LENGTH) {
      setErrorMessage('Please enter all 6 digits of the verification code.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await validateResetToken(otpCode);
      if (res?.data?.valid || res?.success) {
        setStep(3);
      } else {
        setErrorMessage('Invalid or expired code. Please check and try again.');
        setOtp(Array(OTP_LENGTH).fill(''));
        inputRefs.current[0]?.focus();
      }
    } catch (err: unknown) {
      setErrorMessage((err as { message?: string })?.message || 'Verification failed. Code may be invalid or expired.');
      setOtp(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendCode() {
    if (!canResend) return;
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await forgotPassword({ email: email.trim() });
      startCountdown();
      setOtp(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } catch (err: unknown) {
      setErrorMessage((err as { message?: string })?.message || 'Failed to resend code.');
    } finally {
      setIsLoading(false);
    }
  }

  // ----------------------------------------------------
  // STEP 3: Create & Submit New Password
  // ----------------------------------------------------
  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }
    if (!/(?=.*[A-Z])(?=.*[0-9])/.test(newPassword)) {
      setErrorMessage('Password must contain at least one uppercase letter and one number.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const otpCode = otp.join('');
      await resetPassword({
        token: otpCode,
        newPassword,
      });
      setStep(4);
    } catch (err: unknown) {
      setErrorMessage((err as { message?: string })?.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#ecf7f5] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-xl shadow-teal-900/5 border border-teal-50 p-7 sm:p-8">
        <div className="flex justify-center mb-6">
          <AuthLogo size="md" />
        </div>

        {/* Step Progress Pills */}
        {step < 4 && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? 'w-8 bg-[#0d9488]' : 'w-4 bg-gray-200'}`} />
            <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? 'w-8 bg-[#0d9488]' : 'w-4 bg-gray-200'}`} />
            <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 3 ? 'w-8 bg-[#0d9488]' : 'w-4 bg-gray-200'}`} />
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl p-3 animate-in fade-in">
            {errorMessage}
          </div>
        )}

        {/* ================= STEP 1: EMAIL INPUT ================= */}
        {step === 1 && (
          <div>
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-gray-800">
                Forgot your <span className="text-[#0d9488]">Password?</span>
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Enter your registered email address. We&apos;ll send you a 6-digit code to reset your password.
              </p>
            </div>

            <form onSubmit={handleSendEmail} className="space-y-4">
              <TextInput
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setErrorMessage(null);
                }}
                required
                leftIcon={
                  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                Send 6-Digit Code &rarr;
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

        {/* ================= STEP 2: 6-DIGIT OTP INPUT ================= */}
        {step === 2 && (
          <div>
            <div className="text-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-50 text-[#0d9488] mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-800">
                Enter <span className="text-[#0d9488]">Verification Code</span>
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                We sent a 6-digit code to{' '}
                <span className="font-semibold text-gray-800">{email}</span>
              </p>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[11px] font-semibold text-[#0d9488] hover:underline mt-1 cursor-pointer"
              >
                Change Email
              </button>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-5">
              {/* 6 Digit Inputs */}
              <div className="flex justify-center gap-2 sm:gap-2.5" onPaste={handleOtpPaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(index, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(index, e)}
                    className="w-11 h-12 sm:w-12 sm:h-13 text-center text-xl font-bold rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/20 outline-none transition"
                  />
                ))}
              </div>

              <Button
                type="submit"
                isLoading={isLoading}
                fullWidth
                variant="primary"
              >
                Verify Code &rarr;
              </Button>

              {/* Resend Timer */}
              <div className="text-center pt-1">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-xs font-bold text-[#0d9488] hover:underline cursor-pointer"
                  >
                    Didn&apos;t receive code? Resend Code
                  </button>
                ) : (
                  <p className="text-xs text-gray-400">
                    Resend code in <span className="font-semibold text-gray-700">{countdown}s</span>
                  </p>
                )}
              </div>
            </form>
          </div>
        )}

        {/* ================= STEP 3: CREATE NEW PASSWORD ================= */}
        {step === 3 && (
          <div>
            <div className="text-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-50 text-[#0d9488] mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-800">
                Create <span className="text-[#0d9488]">New Password</span>
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Your code is verified! Now set a strong new password for your account.
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-semibold flex items-center gap-2 animate-in fade-in">
                  <span>⚠️</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              <PasswordInput
                placeholder="New Password (min 8 characters)"
                value={newPassword}
                onChange={e => {
                  setNewPassword(e.target.value);
                  setErrorMessage(null);
                }}
                required
              />

              <PasswordStrength password={newPassword} />

              <PasswordInput
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={e => {
                  setConfirmPassword(e.target.value);
                  setErrorMessage(null);
                }}
                required
              />

              <Button
                type="submit"
                isLoading={isLoading}
                fullWidth
                variant="primary"
              >
                Reset Password & Continue &rarr;
              </Button>
            </form>
          </div>
        )}

        {/* ================= STEP 4: SUCCESS ================= */}
        {step === 4 && (
          <div className="text-center py-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 text-[#0d9488] mx-auto mb-4 animate-in zoom-in">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Password Reset Successfully!</h2>
            <p className="text-xs text-gray-500 mb-6 max-w-sm mx-auto">
              Your password has been updated. You can now sign in to your CogniCare account with your new credentials.
            </p>
            <Button
              type="button"
              onClick={() => router.push('/auth/login')}
              fullWidth
              variant="primary"
            >
              Sign In Now &rarr;
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
