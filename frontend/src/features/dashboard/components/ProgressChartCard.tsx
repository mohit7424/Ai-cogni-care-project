'use client';

import React from 'react';
import type { ProgressDataPoint } from '../types/dashboard.types';

interface ProgressChartCardProps {
  timeframe?: string;
  points?: ProgressDataPoint[];
  improvementRate?: string;
  statusSummary?: string;
}

const defaultPoints: ProgressDataPoint[] = [
  { month: 'May', score: 65, height: '65%' },
  { month: 'Jun', score: 68, height: '68%' },
  { month: 'Jul', score: 72, height: '72%' },
  { month: 'Aug', score: 70, height: '70%' },
  { month: 'Sep', score: 72, height: '72%' },
  { month: 'Oct', score: 75, height: '75%', isCurrent: true },
];

export default function ProgressChartCard({
  timeframe = 'Last 6 Months',
  points = defaultPoints,
  improvementRate = '+10% improvement',
  statusSummary = 'Stable & Healthy',
}: ProgressChartCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Card Header with timeframe dropdown */}
        <div className="flex items-center justify-between mb-1">
          <div>
            <h3 className="text-base font-bold text-gray-800">Progress Overview</h3>
            <p className="text-xs text-gray-400">Cognitive clarity score over time</p>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-lg cursor-pointer">
            <span>{timeframe}</span>
            <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Bar Chart Visualization */}
        <div className="pt-8 pb-4">
          <div className="flex items-end justify-between gap-3 h-40 px-2 border-b border-gray-100 pb-2">
            {points.map(item => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-bold text-gray-400 group-hover:text-teal-700 transition">
                  {item.score}%
                </span>
                <div
                  style={{ height: item.height }}
                  className={`w-full max-w-[42px] rounded-t-lg transition-all duration-300 ${
                    item.isCurrent
                      ? 'bg-[#14b8a6] shadow-sm shadow-teal-500/20'
                      : 'bg-[#d8f2ee] hover:bg-[#bfeae3]'
                  }`}
                />
                <span
                  className={`text-[11px] font-medium pt-1 ${
                    item.isCurrent ? 'font-bold text-gray-800' : 'text-gray-400'
                  }`}
                >
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Footer Stats */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100/70 text-xs">
        <div className="flex items-center gap-2 text-gray-600">
          <span className="w-4 h-4 rounded-full bg-teal-50 text-[#0d9488] flex items-center justify-center text-[10px] font-bold">
            ✓
          </span>
          <span className="text-[11px] font-medium">
            Consistent growth with <strong className="text-gray-800">{improvementRate}</strong> over 6 months
          </span>
        </div>

        <div className="text-right">
          <span className="text-[11px] font-bold text-[#0d9488] block">{statusSummary}</span>
          <div className="h-0.5 w-10 bg-[#0d9488] ml-auto mt-0.5 rounded-full" />
        </div>
      </div>
    </div>
  );
}
