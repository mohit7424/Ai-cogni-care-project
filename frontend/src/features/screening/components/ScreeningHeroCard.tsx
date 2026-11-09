'use client';

import React from 'react';

interface HeroCardProps {
  badge?: string;
  heading?: string;
  description?: string;
  highlights?: string[];
  onStart?: () => void;
}

export default function ScreeningHeroCard({
  badge = 'QUARTERLY ROUTINE TEST',
  heading = 'Welcome to Cognitive Screening',
  description = 'This short test will help you track changes in your cognitive health over time. Simple exercises assess memory recall, executive focus, and spatial awareness.',
  highlights = [
    'Takes about 5–10 minutes',
    'Non-diagnostic assessment',
    'Results directly reviewed with your clinician',
  ],
  onStart,
}: HeroCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center gap-8">
      {/* Left Mint Illustration Card */}
      <div className="w-full md:w-56 h-60 bg-gradient-to-b from-[#e8f8f5] to-[#dbf4ee] rounded-3xl border border-teal-100 flex flex-col items-center justify-between p-6 shrink-0 shadow-inner">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-white/80 shadow-xs flex items-center justify-center">
            {/* Brain Outline Icon */}
            <svg
              className="w-16 h-16 text-[#0d9488]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z" />
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z" />
            </svg>
          </div>
        </div>

        {/* Small Bottom Tag */}
        <div className="flex items-center gap-1.5 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold text-teal-800 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
          <span>Adaptive AI Test</span>
        </div>
      </div>

      {/* Right Content Column */}
      <div className="flex-1">
        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#0d9488] bg-teal-50 px-2.5 py-1 rounded-full mb-3">
          {badge}
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2.5">
          {heading}
        </h2>

        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-5">
          {description}
        </p>

        {/* Checkmark Highlights */}
        <ul className="space-y-2 mb-6">
          {highlights.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs font-medium text-gray-700">
              <span className="w-4 h-4 rounded-full bg-teal-50 text-[#0d9488] flex items-center justify-center text-[10px] font-bold shrink-0">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Start Button */}
        <button
          type="button"
          onClick={onStart}
          className="py-3 px-6 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-teal-700/20 flex items-center gap-2 cursor-pointer"
        >
          <span>Start Screening</span>
          <span className="text-base leading-none">&rarr;</span>
        </button>
      </div>
    </div>
  );
}

