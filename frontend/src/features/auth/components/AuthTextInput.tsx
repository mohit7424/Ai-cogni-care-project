'use client';

import React from 'react';

interface AuthTextInputProps {
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  autoComplete?: string;
  className?: string;
}

export default function AuthTextInput({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  icon,
  autoComplete,
  className = '',
}: AuthTextInputProps) {
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
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          className={[
            'w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-all duration-150',
            'placeholder:text-gray-400',
            icon ? 'pl-10' : '',
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
      </div>

      {hasError && (
        <p
          id={`${name}-error`}
          role="alert"
          className="text-xs text-red-600 flex items-center gap-1 mt-0.5"
        >
          <svg
            className="w-3.5 h-3.5 shrink-0"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM7.25 4.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5zM8 11.5a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
