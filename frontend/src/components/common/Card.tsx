'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-xl shadow-teal-900/5 border border-teal-50 p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

