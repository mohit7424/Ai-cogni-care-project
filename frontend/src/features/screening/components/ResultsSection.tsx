'use client';

import React from 'react';
import type { FinalScreeningResult } from '../types/screening.types';

interface ResultsSectionProps {
  result: FinalScreeningResult;
  onRetake: () => void;
}

export default function ResultsSection({ result, onRetake }: ResultsSectionProps) {
  const percentage = Math.round((result.totalScore / result.maxScore) * 100);

  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-8 shadow-xs max-w-4xl mx-auto space-y-6">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-[#e7f7f4] via-[#edf9f7] to-[#e4f6f3] rounded-2xl border border-teal-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Radial score circle */}
          <div className="w-20 h-20 rounded-full bg-white shadow-md border-4 border-[#0d9488] flex flex-col items-center justify-center shrink-0">
            <span className="text-xl font-extrabold text-[#0d9488] leading-none">
              {result.totalScore}
            </span>
            <span className="text-[10px] text-gray-400 font-bold">/ {result.maxScore}</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                {result.clinicalRange}
              </span>
              <span className="text-xs text-gray-500 font-medium">({percentage}% Clarity)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">
              Assessment Completed Successfully
            </h2>
            <p className="text-xs text-teal-800/80 mt-0.5">
              Reviewed by {result.reviewedBy} • {result.dateCompleted}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => alert('Downloading official clinical PDF report...')}
          className="py-2.5 px-4 bg-white hover:bg-gray-50 border border-teal-200 text-teal-800 font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Download PDF Report</span>
        </button>
      </div>

      {/* Summary Narrative */}
      <div className="bg-[#f8fcfa] border border-teal-100/70 p-5 rounded-2xl">
        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
          Clinical Impression Summary
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {result.summary}
        </p>
      </div>

      {/* Domain Breakdown Grid */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-3">Cognitive Domain Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {result.breakdown.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl border border-gray-100 bg-white flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold text-gray-800">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0d9488]"
                      style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 font-semibold">
                    {item.score}/{item.maxScore}
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full capitalize">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Checklist */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-2">Caregiver & Patient Next Steps</h3>
        <div className="space-y-2">
          {result.recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <span className="w-4 h-4 rounded-full bg-teal-50 text-[#0d9488] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                ✓
              </span>
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onRetake}
          className="text-xs font-semibold text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          &larr; Retake or Back to Overview
        </button>

        <a
          href="/dashboard"
          className="py-2.5 px-6 bg-[#0d9488] hover:bg-[#0b8075] text-white font-bold text-xs rounded-xl shadow-md transition"
        >
          Return to Dashboard &rarr;
        </a>
      </div>
    </div>
  );
}

