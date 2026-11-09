'use client';

import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export default function TextInput({
  label,
  error,
  leftIcon,
  rightIcon,
  required,
  id,
  name,
  className = '',
  containerClassName = '',
  ...props
}: TextInputProps) {
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
        {leftIcon && (
          <span className="absolute left-3.5 flex items-center pointer-events-none text-gray-400">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          name={name}
          required={required}
          className={`
            w-full py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-teal-100
            ${leftIcon ? 'pl-10' : 'pl-3.5'}
            ${rightIcon ? 'pr-10' : 'pr-3.5'}
            ${error ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#0d9488]'}
            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <span className="absolute right-3.5 flex items-center text-gray-400">
            {rightIcon}
          </span>
        )}
      </div>

      {error && <p className="text-[11px] text-red-500 pl-1">{error}</p>}
    </div>
  );
}

