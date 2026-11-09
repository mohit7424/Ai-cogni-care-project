'use client';

import React, { useState } from 'react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export default function PasswordInput({
  label,
  error,
  required,
  id,
  name = 'password',
  className = '',
  containerClassName = '',
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || name;

  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-gray-700 select-none pl-0.5"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {/* Lock icon */}
        <span className="absolute left-3.5 flex items-center pointer-events-none text-gray-400">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </span>

        <input
          id={inputId}
          name={name}
          type={showPassword ? 'text' : 'password'}
          required={required}
          className={`
            w-full pl-10 pr-10 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-teal-100
            ${error ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#0d9488]'}
            ${className}
          `}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="absolute right-3.5 flex items-center text-gray-400 hover:text-gray-600 transition"
        >
          {showPassword ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
            </svg>
          )}
        </button>
      </div>

      {error && <p className="text-[11px] text-red-500 pl-1">{error}</p>}
    </div>
  );
}

