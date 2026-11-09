'use client';

import React, { useEffect } from 'react';

interface Props {
  onComplete: () => void;
}

export default function Sub7SubmissionProcessing({ onComplete }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-12 shadow-xs max-w-xl mx-auto text-center space-y-6">
      {/* Animated Glowing Brain in Circular Spinner matching screenshot */}
      <div className="py-6 flex justify-center">
        <div className="relative flex items-center justify-center">
          {/* Pulsing Outer Ring */}
          <div className="w-32 h-32 rounded-full border-4 border-teal-100 border-t-[#0d9488] animate-spin" />
          <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-[#d8f4ed] to-[#b8ebd9] flex items-center justify-center shadow-inner">
            <svg className="w-12 h-12 text-[#0d9488] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z" />
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Submitting Your Screening...
        </h2>
        <p className="text-xs text-gray-500">
          Please wait while we process your results.
        </p>
      </div>

      <div className="w-48 h-1.5 bg-gray-100 rounded-full mx-auto overflow-hidden">
        <div className="h-full bg-[#0d9488] rounded-full animate-pulse w-3/4" />
      </div>
    </div>
  );
}

