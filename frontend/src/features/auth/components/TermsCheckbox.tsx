'use client';

import React from 'react';
import Link from 'next/link';

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  disabled?: boolean;
}

export default function TermsCheckbox({ checked, onChange, error, disabled = false }: TermsCheckboxProps) {
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-start gap-2.5 cursor-pointer select-none group">
        <div className="relative flex items-center justify-center mt-0.5 shrink-0">
          <input
            type="checkbox"
            checked={checked}
            onChange={e => onChange(e.target.checked)}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hasError ? 'terms-error' : undefined}
            className="sr-only"
            id="agree-terms"
          />
          <div
            className={[
              'w-4.5 h-4.5 rounded border-2 flex items-center justify-center transition-all duration-150',
              hasError
                ? checked
                  ? 'bg-indigo-600 border-indigo-600'
                  : 'border-red-400 bg-red-50'
                : checked
                ? 'bg-indigo-600 border-indigo-600'
                : 'bg-white border-gray-300 group-hover:border-indigo-400',
              disabled ? 'opacity-50 cursor-not-allowed' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-hidden="true"
          >
            {checked && (
              <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                <path d="M10.28 1.28L4.5 7.06 1.72 4.28a1 1 0 00-1.44 1.44l3.5 3.5a1 1 0 001.44 0l6.5-6.5a1 1 0 00-1.44-1.44z" />
              </svg>
            )}
          </div>
        </div>

        <span className="text-sm text-gray-600 leading-snug">
          I agree to the{' '}
          <Link
            href="/terms"
            className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline underline-offset-2 transition-colors duration-150"
            onClick={e => e.stopPropagation()}
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline underline-offset-2 transition-colors duration-150"
            onClick={e => e.stopPropagation()}
          >
            Privacy Policy
          </Link>
        </span>
      </label>

      {hasError && (
        <p id="terms-error" role="alert" className="text-xs text-red-600 flex items-center gap-1 ml-7">
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM7.25 4.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5zM8 11.5a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
