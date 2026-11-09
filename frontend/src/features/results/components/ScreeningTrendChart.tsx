'use client';

import React from 'react';
import type { ScreeningTrendPoint } from '../types/results.types';

interface Props {
  points: ScreeningTrendPoint[];
  protocolLabel: string;
}

export default function ScreeningTrendChart({ points, protocolLabel }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-6 shadow-xs flex flex-col justify-between h-full space-y-4">
      {/* Chart Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-900">Screening Trend</h3>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-[#0d9488]" />
          <span>{protocolLabel}</span>
          <span className="text-[10px]">▾</span>
        </div>
      </div>

      {/* Wave / Connected Polyline Area matching image */}
      <div className="pt-6 pb-2">
        <div className="relative h-44 flex items-end justify-between px-4 pb-2">
          {/* Subtle gradient fill background under curve */}
          <div className="absolute inset-x-2 bottom-4 h-28 bg-gradient-to-t from-teal-50/80 via-teal-50/30 to-transparent rounded-2xl pointer-events-none" />

          {points.map((pt, idx) => {
            // calculate relative height for visual alignment (24 -> 40%, 28 -> 85%)
            const heightPercent = 35 + (pt.score - 24) * 12;

            return (
              <div
                key={pt.month}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end z-10 group"
              >
                {/* Score Tag above node */}
                <span className="text-xs font-bold text-teal-800 transition group-hover:scale-110">
                  {pt.score}
                </span>

                {/* Pin Node */}
                <div className="w-3.5 h-3.5 rounded-full bg-white border-3 border-[#0d9488] shadow-xs group-hover:bg-[#0d9488] transition" />

                {/* Vertical Guide Bar */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className="w-0.5 bg-gradient-to-t from-[#0d9488]/40 to-transparent rounded-full"
                />

                {/* Month Label */}
                <span className="text-[11px] font-medium text-gray-400 group-hover:text-gray-700 transition">
                  {pt.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

