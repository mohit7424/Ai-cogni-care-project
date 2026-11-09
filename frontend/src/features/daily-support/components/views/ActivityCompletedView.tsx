'use client';

import React from 'react';
import type { CompletedActivityResult } from '../../types/dailySupport.types';

interface Props {
  result: CompletedActivityResult;
  onContinue: () => void;
}

export default function ActivityCompletedView({ result, onContinue }: Props) {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Main Success Container */}
      <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-8 shadow-xs text-center space-y-6">
        {/* Confetti & Green Checkmark Graphic */}
        <div className="py-2 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-emerald-600/20">
            ✓
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Activity Completed!
          </h2>
          <p className="text-xs text-gray-500">
            Great job! You&apos;ve completed today&apos;s daily support activity.
          </p>
        </div>

        {/* 3 Metric Cards: Score (85%), Time Taken, Your Progress (+10% Chart) matching Screen 4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-left">
          {/* Card 1: Score 85% Dial */}
          <div className="p-5 rounded-2xl bg-[#f8fcfa] border border-teal-100/80 flex items-center gap-4">
            <div className="w-20 h-20 rounded-full border-6 border-teal-100 border-t-[#0d9488] border-r-[#0d9488] flex items-center justify-center bg-white shadow-2xs shrink-0">
              <span className="text-xl font-extrabold text-[#0a3832]">
                {result.scorePercent}%
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Your Score
              </p>
              <h4 className="text-xs font-bold text-gray-800 mt-0.5">High Accuracy</h4>
            </div>
          </div>

          {/* Card 2: Time Taken & Activity Type */}
          <div className="p-5 rounded-2xl bg-[#f8fcfa] border border-teal-100/80 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">⏱</span>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Time Taken
                </p>
                <p className="text-xs font-bold text-gray-800">{result.timeTaken}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1 border-t border-gray-100">
              <span className="text-xl">🧠</span>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Activity
                </p>
                <p className="text-xs font-bold text-gray-800">{result.activityTitle}</p>
              </div>
            </div>
          </div>

          {/* Card 3: Your Progress Bar Chart (+10%) */}
          <div className="p-5 rounded-2xl bg-[#f8fcfa] border border-teal-100/80 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Your Progress
              </p>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                {result.progressPercentBonus}
              </span>
            </div>

            {/* Rising Bars Chart */}
            <div className="flex items-end justify-between gap-1 h-14 pt-2">
              {result.progressChartBars.map((val, idx) => (
                <div
                  key={idx}
                  style={{ height: `${val}%` }}
                  className="flex-1 rounded-t-md bg-[#0d9488] opacity-80 hover:opacity-100 transition"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Recommendation Banner: Trophy + Continue Button matching Screen 4 */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#f0faf7] to-[#e4f6f1] border border-teal-100/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl shadow-2xs shrink-0">
              🏆
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Next Recommended Activity
              </p>
              <h4 className="text-xs font-bold text-gray-900">
                {result.nextRecommendedTitle} &mdash;{' '}
                <span className="font-normal text-gray-600">
                  {result.nextRecommendedDesc}
                </span>
              </h4>
            </div>
          </div>

          <button
            type="button"
            onClick={onContinue}
            className="py-2.5 px-6 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition shrink-0 cursor-pointer"
          >
            Continue &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

