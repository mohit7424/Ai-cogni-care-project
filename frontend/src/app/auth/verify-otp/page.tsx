'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import OTPVerificationScreen from '@/features/auth/screens/OTPVerificationScreen';
import type { OTPPurpose } from '@/features/auth/services/otpService';

function OTPVerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? 'user@cognicare.com';
  const role = searchParams.get('role');
  const rawPurpose = searchParams.get('purpose');

  const purpose: OTPPurpose =
    rawPurpose === 'password-reset' || rawPurpose === 'password_reset'
      ? 'password-reset'
      : rawPurpose === 'phone-verification' || rawPurpose === 'phone_verification'
      ? 'phone-verification'
      : rawPurpose === 'login'
      ? 'login'
      : 'email-verification';

  function handleSuccess() {
    const isDoctor =
      role === 'doctor' ||
      email.toLowerCase().includes('dr.') ||
      email.toLowerCase().includes('doctor') ||
      email.toLowerCase().includes('sarah');

    const isCaregiver =
      role === 'caregiver' ||
      email.toLowerCase().includes('caregiver') ||
      email.toLowerCase().includes('maya') ||
      email.toLowerCase().includes('sharma');

    if (isDoctor) {
      router.push('/doctor');
    } else if (isCaregiver) {
      router.push('/caregiver');
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <OTPVerificationScreen
      identifier={email}
      purpose={purpose}
      onSuccess={handleSuccess}
    />
  );
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
