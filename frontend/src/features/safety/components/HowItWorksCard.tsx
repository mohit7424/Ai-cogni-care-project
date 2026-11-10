'use client';

import React from 'react';
import type { HowItWorksStep } from '../types/safety.types';

interface Props {
  steps: HowItWorksStep[];
}

export default function HowItWorksCard({ steps }: Props) {
  return (
    <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-6 sm:p-7 shadow-xs space-y-5 transition-colors duration-200 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
          How It Works
        </h3>
        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
          Simple steps to keep you connected and safe.
        </p>

        {/* 3 Step Items matching the screenshot */}
        <div className="space-y-4 pt-4">
          {steps.map(step => {
            const isRose = step.color === 'rose';
            const isTeal = step.color === 'teal';

            return (
              <div key={step.stepNumber} className="flex items-start gap-3.5">
                {/* Step Circular Icon */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs mt-0.5 ${
                    isRose
                      ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-500 border border-rose-100 dark:border-rose-900/60'
                      : isTeal
                      ? 'bg-teal-50 dark:bg-[#0f352c] text-[#0d9488] dark:text-[#2dd4bf] border border-teal-100 dark:border-[#154c40]'
                      : 'bg-emerald-50 dark:bg-[#124138] text-emerald-600 dark:text-[#2dd4bf] border border-emerald-100 dark:border-[#155c4e]'
                  }`}
                >
                  {isRose && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  )}
                  {isTeal && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  )}
                  {!isRose && !isTeal && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-800 dark:text-white leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-300 mt-0.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

