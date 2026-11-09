'use client';

import React from 'react';

interface RememberMeCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export default function RememberMeCheckbox({ checked, onChange, disabled = false }: RememberMeCheckboxProps) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none group">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
          id="remember-me"
          aria-label="Remember me for 30 days"
        />
        <div
          className={[
            'w-4.5 h-4.5 rounded border-2 flex items-center justify-center transition-all duration-150',
            checked
              ? 'bg-indigo-600 border-indigo-600'
              : 'bg-white border-gray-300 group-hover:border-indigo-400',
            disabled ? 'opacity-50 cursor-not-allowed' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden="true"
        >
          {checked && (
            <svg
              className="w-3 h-3 text-white"
              viewBox="0 0 12 12"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10.28 1.28L4.5 7.06 1.72 4.28a1 1 0 00-1.44 1.44l3.5 3.5a1 1 0 001.44 0l6.5-6.5a1 1 0 00-1.44-1.44z" />
            </svg>
          )}
        </div>
      </div>
      <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-150">
        Remember me for{' '}
        <span className="font-medium text-gray-700">30 days</span>
      </span>
    </label>
  );
}
