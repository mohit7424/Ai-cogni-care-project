'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type { AuthStatus } from '../types/auth.types';
import { verifyOTP, resendOTP } from '../services/otpService';
import type { OTPPurpose } from '../services/otpService';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;

interface UseOTPVerificationReturn {
  otp: string[];
  status: AuthStatus;
  error: string | null;
  countdown: number;
  canResend: boolean;
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  handleOTPChange: (index: number, value: string) => void;
  handleKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  handleVerify: (onSuccess?: () => void) => Promise<void>;
  handleResend: () => Promise<void>;
  resetOTP: () => void;
}

export function useOTPVerification(
  identifier: string,
  purpose: OTPPurpose
): UseOTPVerificationReturn {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [status, setStatus] = useState<AuthStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(OTP_LENGTH).fill(null));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start countdown on mount
  useEffect(() => {
    startCountdown();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function startCountdown(): void {
    setCountdown(RESEND_COOLDOWN_SECONDS);
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

  const handleOTPChange = useCallback((index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, '').slice(-1);
    setOtp(prev => {
      const updated = [...prev];
      updated[index] = digit;
      return updated;
    });
    setError(null);

    // Auto-advance to next input
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }, []);

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        if (!otp[index] && index > 0) {
          // Move to previous and clear it
          setOtp(prev => {
            const updated = [...prev];
            updated[index - 1] = '';
            return updated;
          });
          inputRefs.current[index - 1]?.focus();
        } else {
          setOtp(prev => {
            const updated = [...prev];
            updated[index] = '';
            return updated;
          });
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp]
  );

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;

    const updated = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((char, i) => {
      updated[i] = char;
    });
    setOtp(updated);

    // Focus the next empty input or the last one
    const nextEmpty = updated.findIndex(d => !d);
    const focusIndex = nextEmpty === -1 ? OTP_LENGTH - 1 : nextEmpty;
    inputRefs.current[focusIndex]?.focus();
  }, []);

  const handleVerify = useCallback(
    async (onSuccess?: () => void): Promise<void> => {
      const otpString = otp.join('');
      if (otpString.length < OTP_LENGTH) {
        setError('Please enter all 6 digits.');
        return;
      }

      setStatus('loading');
      setError(null);

      try {
        // TODO: Connect to real API
        await verifyOTP({ identifier, otp: otpString, purpose });
        setStatus('success');
        onSuccess?.();
      } catch (err) {
        const message =
          (err as { message?: string })?.message ?? 'Invalid OTP. Please try again.';
        setError(message);
        setStatus('error');
        // Clear OTP fields on failure
        setOtp(Array(OTP_LENGTH).fill(''));
        inputRefs.current[0]?.focus();
      }
    },
    [otp, identifier, purpose]
  );

  const handleResend = useCallback(async (): Promise<void> => {
    if (!canResend) return;

    try {
      // TODO: Connect to real API
      await resendOTP({ identifier, purpose });
      startCountdown();
      setOtp(Array(OTP_LENGTH).fill(''));
      setError(null);
      inputRefs.current[0]?.focus();
    } catch (err) {
      const message =
        (err as { message?: string })?.message ?? 'Failed to resend OTP. Please try again.';
      setError(message);
    }
  }, [canResend, identifier, purpose]);

  const resetOTP = useCallback(() => {
    setOtp(Array(OTP_LENGTH).fill(''));
    setStatus('idle');
    setError(null);
  }, []);

  return {
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
    resetOTP,
  };
}
