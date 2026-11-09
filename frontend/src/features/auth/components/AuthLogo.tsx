'use client';

import React from 'react';

interface AuthLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const sizeMap = {
  sm: {
    icon: 'w-7 h-7',
    svg: 'w-4 h-4',
    title: 'text-sm',
    tagline: 'text-[9px]',
  },
  md: {
    icon: 'w-9 h-9',
    svg: 'w-5 h-5',
    title: 'text-base',
    tagline: 'text-[10px]',
  },
  lg: {
    icon: 'w-12 h-12',
    svg: 'w-7 h-7',
    title: 'text-xl',
    tagline: 'text-xs',
  },
};

export default function AuthLogo({
  size = 'md',
  showText = true,
  className = '',
}: AuthLogoProps) {
  const s = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Brain Icon */}
      <div
        className={`${s.icon} rounded-xl bg-gradient-to-tr from-[#0b8b80] to-[#12b3a2] flex items-center justify-center text-white shadow-md shadow-emerald-700/10 shrink-0`}
      >
        <svg
          className={`${s.svg} text-white`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-extrabold text-[#163636] leading-tight ${s.title}`}>
            Cogni Care
          </span>
          <span className={`text-gray-500 font-medium ${s.tagline}`}>
            Care. Connect. Thrive.
          </span>
        </div>
      )}
    </div>
  );
}
