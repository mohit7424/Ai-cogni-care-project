'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { UserRole } from '../types/auth.types';
import AuthLogo from '../components/AuthLogo';
import { Button } from '@/components/common';

interface RoleOption {
  value: UserRole;
  label: string;
  badge: string;
  description: string;
  icon: React.ReactNode;
}

const ROLES: RoleOption[] = [
  {
    value: 'patient',
    label: 'Patient',
    badge: 'Care Seeker',
    description: 'Track daily wellness, cognitive exercises, and stay connected with care team.',
    icon: (
      <svg className="w-5 h-5 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    value: 'therapist',
    label: 'Caregiver / Therapist',
    badge: 'Provider',
    description: 'Monitor patient progress, assign cognitive activities, and provide support.',
    icon: (
      <svg className="w-5 h-5 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function RoleSelectionScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [isLoading, setIsLoading] = useState(false);

  function handleContinue() {
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  }

  return (
    <div className="min-h-screen bg-[#ecf7f5] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[500px] bg-white rounded-3xl shadow-xl shadow-teal-900/5 border border-teal-50 p-7 sm:p-8">
        <div className="flex justify-center mb-6">
          <AuthLogo size="md" />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">
            Select Your <span className="text-[#0d9488]">Role</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Choose your account type to personalize your experience.
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {ROLES.map(role => {
            const isSelected = selectedRole === role.value;
            return (
              <div
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3.5 ${
                  isSelected
                    ? 'border-[#0d9488] bg-teal-50/40 shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-teal-100 text-[#0d9488]' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {role.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-gray-800">{role.label}</h2>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        isSelected ? 'bg-teal-100 text-[#0d9488]' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {role.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {role.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <Button
          onClick={handleContinue}
          isLoading={isLoading}
          fullWidth
          variant="primary"
        >
          Continue &rarr;
        </Button>
      </div>
    </div>
  );
}
