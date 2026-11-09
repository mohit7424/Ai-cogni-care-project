'use client';

import React from 'react';

interface CogniCareHeaderProps {
  headline: string;
  highlightedWord?: string;
  subtext: string;
  featureCards: Array<{
    icon: React.ReactNode;
    title: string;
  }>;
}

export default function CogniCareHeader({
  headline,
  highlightedWord,
  subtext,
  featureCards,
}: CogniCareHeaderProps) {
  return (
    <div className="w-full mb-6">
      {/* Top Brand Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-emerald-100/60">
        <div className="flex items-center gap-2.5">
          {/* Teal Brain Logo */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0b8b80] to-[#12b3a2] flex items-center justify-center text-white shadow-md shadow-emerald-700/10">
            <svg
              className="w-5 h-5 text-white"
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
          <div>
            <span className="font-extrabold text-base tracking-tight text-[#163636] block leading-tight">
              Cogni Care
            </span>
            <span className="text-[10px] text-gray-500 font-medium block">
              Care. Connect. Thrive.
            </span>
          </div>
        </div>

        {/* Right Badge */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0d9488] bg-emerald-50/80 px-3 py-1 rounded-full border border-emerald-100">
          <span>Your Cognitive Wellness Partner</span>
          <svg className="w-3.5 h-3.5 text-[#0d9488]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="flex items-center justify-between gap-4 py-5">
        <div className="max-w-[62%]">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#113131] leading-tight tracking-tight">
            {headline}{' '}
            {highlightedWord && (
              <span className="text-[#0d9488] block sm:inline font-extrabold">
                {highlightedWord}
              </span>
            )}
          </h1>
          <p className="text-xs text-gray-500 mt-1.5 font-medium tracking-wide">
            {subtext}
          </p>
        </div>

        {/* Small floating preview cards graphic */}
        <div className="relative shrink-0 flex items-center justify-end">
          <div className="relative flex items-center -space-x-4 pr-1">
            <div className="w-16 h-20 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-lg border border-emerald-200 shadow-sm p-1 flex flex-col justify-between transform -rotate-3">
              <div className="w-5 h-5 rounded-full bg-emerald-200 mx-auto" />
              <div className="space-y-1">
                <div className="h-1 bg-emerald-300 rounded w-full" />
                <div className="h-1 bg-emerald-200 rounded w-2/3" />
              </div>
            </div>
            <div className="w-18 h-22 bg-white rounded-lg border border-teal-300 shadow-md p-1.5 flex flex-col justify-between z-10">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center text-[8px] text-white font-bold">
                  ✓
                </div>
                <div className="h-1.5 bg-teal-200 rounded w-8" />
              </div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-400 mx-auto shadow-sm" />
              <div className="space-y-1">
                <div className="h-1.5 bg-teal-500 rounded w-full" />
                <div className="h-1 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
            <div className="w-16 h-20 bg-gradient-to-br from-teal-50 to-emerald-100 rounded-lg border border-emerald-200 shadow-sm p-1 flex flex-col justify-between transform rotate-3">
              <div className="w-5 h-5 rounded-full bg-teal-200 mx-auto" />
              <div className="space-y-1">
                <div className="h-1 bg-teal-300 rounded w-full" />
                <div className="h-1 bg-teal-200 rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Badges Row */}
      <div className="grid grid-cols-3 gap-3 pt-1">
        {featureCards.map((card, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center py-2.5 px-2 bg-white/80 hover:bg-white rounded-xl border border-gray-100 shadow-sm text-center transition-all"
          >
            <div className="text-[#0d9488] mb-1">{card.icon}</div>
            <span className="text-[11px] font-semibold text-gray-700">
              {card.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

