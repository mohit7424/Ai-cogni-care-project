'use client';

import React from 'react';
import AuthLogo from './AuthLogo';

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  showLogo?: boolean;
}

export default function AuthHeader({ title, subtitle, showLogo = true }: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center gap-4 mb-8">
      {showLogo && <AuthLogo size="md" />}
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
