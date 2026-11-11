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
    description: 'Track daily wellness, cognitive exercises, and stay connected with your clinician.',
    icon: (
      <svg className="w-5 h-5 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    value: 'doctor',
    label: 'Doctor / Neurologist',
    badge: 'Clinician Workspace',
    description: 'Review MMSE screening queues, monitor assigned patients, and sign clinical reports.',
    icon: (
      <svg className="w-5 h-5 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
        <circle cx="20" cy="10" r="2" />
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
      if (selectedRole === 'doctor') {
        router.push('/doctor');
      } else {
        router.push('/dashboard');
      }
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
