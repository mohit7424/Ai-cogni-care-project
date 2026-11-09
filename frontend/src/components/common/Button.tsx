'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition duration-150 cursor-pointer select-none disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] text-white shadow-md shadow-teal-700/20 focus:ring-2 focus:ring-teal-300',
    secondary:
      'bg-teal-50 hover:bg-teal-100 text-[#0d9488] border border-teal-200 focus:ring-2 focus:ring-teal-200',
    outline:
      'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 shadow-2xs focus:ring-2 focus:ring-gray-200',
    ghost:
      'bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900',
  };

  const sizes = {
    sm: 'py-1.5 px-3 text-xs gap-1.5',
    md: 'py-2.5 px-4 text-xs sm:text-sm gap-2',
    lg: 'py-3 px-5 text-sm sm:text-base gap-2.5',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin w-4 h-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
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
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}

