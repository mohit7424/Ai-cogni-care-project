'use client';

import React, { useEffect } from 'react';
import type { V2SubmissionStageItem } from '../../types';
import { mockV2ScreeningData } from '../../data/screening.data';

interface Props {
  stages?: V2SubmissionStageItem[];
  title?: string;
  subtitle?: string;
  onComplete: () => void;
}

export default function V2SubmissionProcessing({
  stages = mockV2ScreeningData.submission.stages,
  title = mockV2ScreeningData.submission.title,
  subtitle = mockV2ScreeningData.submission.subtitle,
  onComplete,
}: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-8 sm:p-12 shadow-xs max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
        {/* Central 3D Glowing Mint Brain matching screenshot 4 */}
        <div className="w-40 h-40 rounded-3xl bg-gradient-to-tr from-[#d4f3ed] to-[#b4ebd8] flex items-center justify-center shadow-inner shrink-0 relative">
          <div className="absolute inset-0 rounded-3xl border-2 border-teal-300 animate-pulse" />
          <span className="text-7xl animate-bounce">🧠</span>
        </div>

        {/* Text and animated progress bar */}
        <div className="space-y-3 max-w-md">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            {subtitle}
          </p>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-400 to-[#0d9488] rounded-full animate-pulse w-4/5" />
          </div>
        </div>
      </div>

      {/* 3 Pipeline Stages matching screenshot 4: Saving Answers -> Analyzing Results -> Generating Report */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between max-w-2xl mx-auto px-4 text-xs font-semibold text-gray-700">
        {stages.map((stage, idx) => (
          <React.Fragment key={stage.id}>
            <div className={`flex items-center gap-2 ${idx < stages.length - 1 ? 'text-[#0d9488]' : 'text-gray-500'}`}>
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  idx < stages.length - 1
                    ? 'bg-[#0d9488] text-white'
                    : 'bg-teal-100 text-[#0d9488] animate-spin'
                }`}
              >
                {idx < stages.length - 1 ? '✓' : '⚙'}
              </span>
              <span>{stage.label}</span>
            </div>
            {idx < stages.length - 1 && <span className="h-0.5 w-16 bg-[#0d9488]" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
