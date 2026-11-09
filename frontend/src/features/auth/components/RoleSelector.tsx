'use client';

import React from 'react';
import type { UserRole } from '../types/auth.types';

interface RoleOption {
  value: UserRole;
  label: string;
  emoji: string;
  description: string;
}

const ROLES: RoleOption[] = [
  {
    value: 'patient',
    label: 'Patient',
    emoji: '🧠',
    description: 'Seeking mental health support and cognitive care',
  },
  {
    value: 'therapist',
    label: 'Therapist',
    emoji: '👨‍⚕️',
    description: 'Licensed professional providing therapy and care',
  },
  {
    value: 'admin',
    label: 'Administrator',
    emoji: '⚙️',
    description: 'Managing platform, users, and configurations',
  },
];

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
  error?: string;
}

export default function RoleSelector({ value, onChange, error }: RoleSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-700">
        I am a <span className="text-red-500">*</span>
      </span>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {ROLES.map(role => {
          const isSelected = value === role.value;
          return (
            <button
              key={role.value}
              type="button"
              onClick={() => onChange(role.value)}
              aria-pressed={isSelected}
              className={[
                'relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all duration-150 cursor-pointer',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2',
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {/* Selected indicator */}
              {isSelected && (
                <span className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                    <path d="M10.28 1.28L4.5 7.06 1.72 4.28a1 1 0 00-1.44 1.44l3.5 3.5a1 1 0 001.44 0l6.5-6.5a1 1 0 00-1.44-1.44z" />
                  </svg>
                </span>
              )}

              <span className="text-2xl leading-none" role="img" aria-label={role.label}>
                {role.emoji}
              </span>

              <div className="space-y-0.5">
                <p
                  className={`text-sm font-semibold ${
                    isSelected ? 'text-indigo-700' : 'text-gray-800'
                  }`}
                >
                  {role.label}
                </p>
                <p
                  className={`text-xs leading-snug ${
                    isSelected ? 'text-indigo-500' : 'text-gray-500'
                  }`}
                >
                  {role.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <p role="alert" className="text-xs text-red-600 flex items-center gap-1 mt-0.5">
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM7.25 4.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5zM8 11.5a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
