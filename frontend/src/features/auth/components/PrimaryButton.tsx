'use client';

import React from 'react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

const variantClasses: Record<NonNullable<PrimaryButtonProps['variant']>, string> = {
  primary:
    'bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 active:bg-indigo-800 focus-visible:ring-indigo-500 disabled:bg-indigo-300',
  secondary:
    'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 active:bg-indigo-200 focus-visible:ring-indigo-400 disabled:bg-gray-50 disabled:text-gray-400',
  outline:
    'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:bg-gray-100 focus-visible:ring-gray-400 disabled:bg-gray-50 disabled:text-gray-400',
};

export default function PrimaryButton({
  children,
  onClick,
  type = 'button',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  variant = 'primary',
  className = '',
}: PrimaryButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses[variant],
        fullWidth ? 'w-full' : '',
        isLoading ? 'pointer-events-none' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
}
