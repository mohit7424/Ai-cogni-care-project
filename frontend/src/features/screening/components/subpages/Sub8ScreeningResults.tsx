'use client';

import React from 'react';

interface Props {
  onViewDetails: () => void;
  onBackToDashboard: () => void;
}

export default function Sub8ScreeningResults({ onViewDetails, onBackToDashboard }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-8 shadow-xs max-w-2xl mx-auto space-y-6">
      {/* 2 Result Cards: Circular Score Gauge (78%) & Well Done Card matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* Circle Score Gauge Card */}
        <div className="p-6 rounded-2xl bg-[#f8fcfa] border border-teal-100/80 flex flex-col items-center justify-center text-center">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Circular Gauge Border */}
            <div className="w-28 h-28 rounded-full border-8 border-teal-100 border-t-[#0d9488] border-r-[#0d9488] flex items-center justify-center bg-white shadow-xs">
              <span className="text-3xl font-extrabold text-[#0d9488]">78%</span>
            </div>
          </div>
          <p className="text-xs font-bold text-gray-700 mt-3">Your Score</p>
        </div>

        {/* Well Done Status Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#ebf9f5] to-[#def5ef] border border-teal-200/80 flex flex-col justify-center space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-xs font-bold">
              ✓
            </span>
            <h3 className="text-base font-extrabold text-gray-900">Well Done!</h3>
          </div>
          <p className="text-xs text-teal-900/80 font-medium leading-relaxed">
            Your score is within the normal range.
          </p>
        </div>
      </div>

      {/* Info Notice Box */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#f0f9f7] border border-teal-100 text-xs text-gray-600">
        <span className="w-5 h-5 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
          ℹ
        </span>
        <p className="leading-relaxed">
          This result is for informational purposes only. Please discuss with your clinician for interpretation.
        </p>
      </div>

      {/* Action Buttons matching screenshot */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onViewDetails}
          className="py-2.5 px-6 bg-white hover:bg-gray-50 border border-teal-200 text-[#0d9488] font-bold text-xs rounded-xl shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
        >
          <span>View Details</span>
          <span>&rarr;</span>
        </button>

        <button
          type="button"
          onClick={onBackToDashboard}
          className="py-2.5 px-6 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

