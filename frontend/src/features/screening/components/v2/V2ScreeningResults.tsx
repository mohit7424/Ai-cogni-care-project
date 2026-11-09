'use client';

import React from 'react';
import type { V2ScreeningResultData } from '../../types';
import { mockV2ScreeningData } from '../../data/screening.data';

interface Props {
  resultsData?: V2ScreeningResultData;
  onViewDetailedReport: () => void;
}

export default function V2ScreeningResults({
  resultsData = mockV2ScreeningData.results,
  onViewDetailedReport,
}: Props) {
  const { overallScore, performanceBadge, disclaimer, domains } = resultsData;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Main Grid: Left Score & Recommendation + Right Cognitive Domains Breakdown matching screenshot 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Card: 86% Circular Dial + Well Done + 3D Brain Illustration */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            {/* Trophy Tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🏆</span>
              <div>
                <h3 className="text-base font-bold text-gray-900">Your Screening Results</h3>
                <p className="text-xs text-gray-500">Your cognitive performance is within the expected range.</p>
              </div>
            </div>

            {/* Score Ring & Badge */}
            <div className="flex items-center gap-6 py-2">
              <div className="w-28 h-28 rounded-full border-8 border-teal-100 border-t-[#0d9488] border-r-[#0d9488] flex flex-col items-center justify-center bg-white shadow-xs shrink-0">
                <span className="text-3xl font-extrabold text-[#0d9488]">{overallScore}%</span>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Overall Score</span>
              </div>

              <div className="space-y-2">
                <span className="inline-block text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  ✓ {performanceBadge}
                </span>
                <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
                  {disclaimer}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button & 3D Brain Icon below */}
          <div className="flex items-end justify-between pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onViewDetailedReport}
              className="py-2.5 px-6 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
            >
              View Detailed Report &rarr;
            </button>

            <span className="text-5xl opacity-80">🧠</span>
          </div>
        </div>

        {/* Right Card: Cognitive Domains Breakdown matching screenshot 5 */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-4">
          <h4 className="text-sm font-bold text-gray-900">Cognitive Domains</h4>

          <div className="space-y-3.5">
            {domains.map(d => (
              <div key={d.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                  <span>{d.name}</span>
                  <span className="text-[#0d9488] font-bold">{d.score}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0d9488] rounded-full transition-all duration-300"
                    style={{ width: d.width }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-gray-400 text-center pt-2">
            Clinically aligned domain assessment metrics.
          </p>
        </div>
      </div>
    </div>
  );
}
