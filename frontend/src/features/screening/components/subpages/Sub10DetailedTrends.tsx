'use client';

import React, { useState } from 'react';

interface Props {
  onBackToHistory: () => void;
}

export default function Sub10DetailedTrends({ onBackToHistory }: Props) {
  const [filter, setFilter] = useState<'6m' | '1y' | 'all'>('6m');

  const points = [
    { month: 'May', score: 68, y: '68%' },
    { month: 'Jun', score: 72, y: '72%' },
    { month: 'Jul', score: 70, y: '70%' },
    { month: 'Aug', score: 72, y: '72%' },
    { month: 'Nov', score: 78, y: '78%' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-8 shadow-xs max-w-5xl mx-auto space-y-6">
      {/* Top Header & Range Filters matching screenshot */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Your Cognitive Health Trend
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Long-term assessment score trajectory
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Time range tabs */}
          <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setFilter('6m')}
              className={`px-3 py-1 rounded-lg transition ${
                filter === '6m' ? 'bg-white text-[#0d9488] shadow-xs' : 'text-gray-600'
              }`}
            >
              6 Months
            </button>
            <button
              type="button"
              onClick={() => setFilter('1y')}
              className={`px-3 py-1 rounded-lg transition ${
                filter === '1y' ? 'bg-white text-[#0d9488] shadow-xs' : 'text-gray-600'
              }`}
            >
              1 Year
            </button>
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg transition ${
                filter === 'all' ? 'bg-white text-[#0d9488] shadow-xs' : 'text-gray-600'
              }`}
            >
              All Time
            </button>
          </div>

          <button
            type="button"
            onClick={onBackToHistory}
            className="text-xs font-bold text-[#0d9488] hover:underline"
          >
            &larr; Back
          </button>
        </div>
      </div>

      {/* Grid: Main Line Chart (Left) & Comparison Stats Box with Brain Graphic (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Trend Line Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-[#fbfdfc] border border-gray-100 space-y-4">
          <div className="relative h-56 flex flex-col justify-between pt-4 pb-6">
            {/* Horizontal Grid lines with Y-Axis */}
            <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-gray-400 pointer-events-none">
              <div className="border-b border-gray-100 flex items-center justify-between pb-0.5">
                <span>100</span>
              </div>
              <div className="border-b border-gray-100 flex items-center justify-between pb-0.5">
                <span>75</span>
              </div>
              <div className="border-b border-gray-100 flex items-center justify-between pb-0.5">
                <span>50</span>
              </div>
              <div className="border-b border-gray-100 flex items-center justify-between pb-0.5">
                <span>25</span>
              </div>
              <div className="flex items-center justify-between">
                <span>0</span>
              </div>
            </div>

            {/* Connecting Teal Line Representation */}
            <div className="relative h-full flex items-end justify-between px-6 z-10">
              {points.map(pt => (
                <div key={pt.month} className="flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[11px] font-extrabold text-[#0d9488] bg-teal-50 px-1.5 py-0.5 rounded-md shadow-2xs">
                    {pt.score}%
                  </span>
                  {/* Point Marker */}
                  <div className="w-3.5 h-3.5 rounded-full bg-[#0d9488] ring-4 ring-teal-100 shadow-xs" />
                  <span className="text-[11px] font-semibold text-gray-500 mt-1">
                    {pt.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Comparison Card with Brain Graphic matching screenshot */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-gradient-to-br from-[#ebf9f5] to-[#dbf4ee] border border-teal-200/80 flex flex-col justify-between h-full space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
              Comparison
            </span>
            <p className="text-xs text-gray-600 mt-1">Your Score</p>
            <h3 className="text-3xl font-extrabold text-[#0d9488]">78%</h3>
            <p className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
              <span>vs Last Month</span>
              <span className="bg-emerald-100 px-1.5 py-0.5 rounded">+6% ↗</span>
            </p>
          </div>

          {/* Brain Graphic Watermark */}
          <div className="py-2 flex justify-end opacity-70">
            <svg className="w-18 h-18 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z" />
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z" />
            </svg>
          </div>

          {/* Bottom Tip Badge */}
          <div className="p-2.5 rounded-xl bg-white/90 text-[11px] text-teal-900 font-medium">
            💡 Keep up the good work! Continue your daily cognitive activities.
          </div>
        </div>
      </div>
    </div>
  );
}
