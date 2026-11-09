'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import OTPVerificationScreen from '@/features/auth/screens/OTPVerificationScreen';
import type { OTPPurpose } from '@/features/auth/services/otpService';

function OTPVerifyContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? 'user@cognicare.com';
  const rawPurpose = searchParams.get('purpose');

  const purpose: OTPPurpose =
    rawPurpose === 'password-reset' || rawPurpose === 'password_reset'
      ? 'password-reset'
      : rawPurpose === 'phone-verification' || rawPurpose === 'phone_verification'
      ? 'phone-verification'
      : rawPurpose === 'login'
      ? 'login'
      : 'email-verification';

  return <OTPVerificationScreen identifier={email} purpose={purpose} />;
}

export default function OTPVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-sm text-gray-500">
          Loading OTP verification...
        </div>
      }
    >
      <OTPVerifyContent />
    </Suspense>
  );
}
