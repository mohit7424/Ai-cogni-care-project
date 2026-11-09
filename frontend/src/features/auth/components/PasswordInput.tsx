'use client';

import React, { useState } from 'react';

interface PasswordInputProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
}

function LockIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
      <path
        fillRule="evenodd"
        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a9.957 9.957 0 002.505-3.97.75.75 0 000-.45C17.268 5.943 13.478 3 9 3a9.976 9.976 0 00-4.966 1.315L3.28 2.22zM9 5c.456 0 .9.044 1.33.126l-1.374 1.374A3 3 0 006.126 9.33L4.573 7.779A7.978 7.978 0 019 5zM5.84 13.09l-1.52 1.52A9.976 9.976 0 014.46 10 9.995 9.995 0 0110 5c.19 0 .378.006.564.017L8.9 6.68A5 5 0 004.46 10c0 1.1.283 2.134.78 3.034l.6.056zm4.25 1.878a7.978 7.978 0 01-5.5-5.5l1.46-1.46a5 5 0 006.5 6.5l-2.46 2.46zM13 10a3 3 0 00-3-3c-.152 0-.302.012-.448.034l-1.1 1.1a4 4 0 014.549 4.549l1.1-1.1A3.002 3.002 0 0013 10z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function PasswordInput({
  label,
  name,
  placeholder = 'Enter your password',
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  autoComplete = 'current-password',
  className = '',
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const hasError = Boolean(error);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 select-none"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <div className="relative">
        {/* Lock icon on left */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <LockIcon />
        </div>

        <input
          id={name}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          className={[
            'w-full rounded-xl border bg-white pl-10 pr-11 py-2.5 text-sm text-gray-900 outline-none transition-all duration-150',
            'placeholder:text-gray-400',
            hasError
              ? 'border-red-400 ring-1 ring-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100',
            disabled
              ? 'cursor-not-allowed bg-gray-50 text-gray-400 opacity-70'
              : 'hover:border-gray-300',
          ]
            .filter(Boolean)
            .join(' ')}
        />

        {/* Show/hide toggle button */}
        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          disabled={disabled}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-150 disabled:cursor-not-allowed"
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>

      {hasError && (
        <p
          id={`${name}-error`}
          role="alert"
          className="text-xs text-red-600 flex items-center gap-1 mt-0.5"
        >
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM7.25 4.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5zM8 11.5a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
