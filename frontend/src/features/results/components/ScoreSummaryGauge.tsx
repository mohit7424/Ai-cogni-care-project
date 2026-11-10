'use client';

import React from 'react';

interface Props {
  percentage: number;
  summary: string;
}

export default function ScoreSummaryGauge({ percentage, summary }: Props) {
  return (
    <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full text-center space-y-4 transition-colors duration-200">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white text-left">Score Summary</h3>

      {/* Radial 87% Performance Gauge */}
      <div className="py-2 flex flex-col items-center justify-center">
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Radial Track Border */}
          <div className="w-36 h-36 rounded-full border-10 border-gray-100 dark:border-[#0f352c] border-t-[#0d9488] border-r-[#0d9488] border-b-[#0d9488] flex flex-col items-center justify-center bg-white dark:bg-[#0c2b24] shadow-xs">
            <span className="text-3xl font-extrabold text-[#0a3832] dark:text-teal-200">
              {percentage}%
            </span>
            <span className="text-[9px] font-extrabold text-gray-400 dark:text-gray-400 uppercase tracking-wider mt-0.5">
              Performance
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Light Green Callout */}
      <div className="p-3.5 rounded-2xl bg-[#ebf9f5] dark:bg-[#071f1a] border border-teal-100 dark:border-[#154c40] text-xs text-teal-900 dark:text-teal-200 font-medium leading-relaxed">
        {summary}
      </div>
    </div>
  );
}

