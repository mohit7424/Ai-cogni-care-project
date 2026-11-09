'use client';

import React from 'react';
import type { ResultsSummaryStats } from '../types/results.types';

interface Props {
  stats: ResultsSummaryStats;
}

export default function ResultsTopStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1: Latest Score */}
      <div className="bg-white rounded-2xl border border-teal-100/80 p-5 shadow-xs flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Latest Score
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-[#0a3832]">
              {stats.latestScore}
            </span>
            <span className="text-xs text-gray-400 font-semibold">
              / {stats.totalScoreMax}
            </span>
          </div>
          <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mt-1">
            • {stats.scoreStatus}
          </span>
        </div>

        <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center text-lg shadow-2xs">
          ★
        </div>
      </div>

      {/* Card 2: Trend */}
      <div className="bg-white rounded-2xl border border-teal-100/80 p-5 shadow-xs flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Trend
          </p>
          <h3 className="text-3xl font-extrabold text-[#0a3832]">
            {stats.trendStatus}
          </h3>
          <p className="text-[11px] font-bold text-[#0d9488] flex items-center gap-1 mt-1">
            <span>↗</span>
            <span>{stats.trendSubtext}</span>
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-teal-50 text-[#0d9488] flex items-center justify-center text-base shadow-2xs">
          📈
        </div>
      </div>

      {/* Card 3: Total Tests */}
      <div className="bg-white rounded-2xl border border-teal-100/80 p-5 shadow-xs flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Total Tests
          </p>
          <h3 className="text-3xl font-extrabold text-[#0a3832]">
            {stats.totalTestsCount}
          </h3>
          <p className="text-[11px] text-gray-400 font-medium mt-1">
            {stats.totalTestsSubtext}
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-teal-50 text-[#0d9488] flex items-center justify-center text-base shadow-2xs">
          🛡️
        </div>
      </div>
    </div>
  );
}

