'use client';

import React from 'react';

interface Props {
  onViewDetailedReport: () => void;
}

export default function V2ScreeningResults({ onViewDetailedReport }: Props) {
  const domains = [
    { name: 'Memory', score: '90%', width: '90%' },
    { name: 'Attention', score: '85%', width: '85%' },
    { name: 'Language', score: '88%', width: '88%' },
    { name: 'Executive Function', score: '86%', width: '86%' },
    { name: 'Processing Speed', score: '82%', width: '82%' },
  ];

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
                <span className="text-3xl font-extrabold text-[#0d9488]">86%</span>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Overall Score</span>
              </div>

              <div className="space-y-2">
                <span className="inline-block text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  ✓ Good Performance
                </span>
                <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
                  This is a screening result and not a diagnosis. For any concerns, please consult a healthcare professional.
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

