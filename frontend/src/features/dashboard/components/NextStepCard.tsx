'use client';

import React from 'react';
import type { NextStepAction } from '../types/dashboard.types';

interface NextStepCardProps {
  step?: NextStepAction;
  onStart?: () => void;
}

export default function NextStepCard({
  step = {
    id: 'cognitive-screening',
    badge: 'Your Next Step',
    title: 'Cognitive Screening',
    description: 'Complete your screening to track your cognitive health with clinically backed assessments.',
    actionText: 'Start Screening',
  },
  onStart,
}: NextStepCardProps) {
  return (
    <div className="bg-[#0b3e37] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between h-full">
      <div>
        {/* Badge */}
        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-teal-300 bg-[#124d45] px-2.5 py-1 rounded-full mb-3">
          {step.badge}
        </span>

        {/* Title & Desc */}
        <h3 className="text-lg font-bold text-white mb-1.5">{step.title}</h3>
        <p className="text-xs text-teal-100/80 leading-relaxed">
          {step.description}
        </p>

        {/* Central Brain Illustration Circle */}
        <div className="py-6 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-radial from-[#12584e] to-[#0a3630] border border-teal-500/20 flex items-center justify-center shadow-inner">
            <svg
              className="w-12 h-12 text-[#2dd4bf]"
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
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={onStart}
        className="w-full py-2.5 px-4 bg-[#2dd4bf] hover:bg-[#20c2ad] active:scale-[0.99] text-[#0a3832] font-bold text-xs rounded-xl transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <span>{step.actionText}</span>
        <span>&rarr;</span>
      </button>
    </div>
  );
}
