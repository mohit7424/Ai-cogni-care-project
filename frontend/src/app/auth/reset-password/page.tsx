'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ResetPasswordScreen from '@/features/auth/screens/ResetPasswordScreen';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? 'demo-token';

  return <ResetPasswordScreen token={token} />;
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-sm text-gray-500">
          Loading reset screen...
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
