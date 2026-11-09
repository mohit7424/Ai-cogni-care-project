'use client';

import React from 'react';

interface Props {
  onBegin: () => void;
  onBack?: () => void;
}

export default function Sub3Introduction({ onBegin, onBack }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-8 shadow-xs max-w-2xl mx-auto text-center space-y-6">
      {/* 4-Step Mini Flow Pills */}
      <div className="flex items-center justify-center gap-6 max-w-md mx-auto text-xs pb-4 border-b border-gray-100">
        <div className="flex items-center gap-1.5 font-bold text-[#0d9488]">
          <span className="w-5 h-5 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-[10px]">
            1
          </span>
          <span>Introduction</span>
        </div>
        <span className="text-gray-300">&bull;</span>
        <div className="text-gray-400">Questions</div>
        <span className="text-gray-300">&bull;</span>
        <div className="text-gray-400">Review</div>
        <span className="text-gray-300">&bull;</span>
        <div className="text-gray-400">Results</div>
      </div>

      {/* Central Brain Illustration */}
      <div className="py-2 flex justify-center">
        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#d8f4ed] to-[#c1ece2] flex items-center justify-center shadow-inner">
          <svg className="w-14 h-14 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z" />
          </svg>
        </div>
      </div>

      {/* Headings */}
      <div className="space-y-1.5 max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Cognitive Screening
        </h2>
        <p className="text-xs text-gray-500 leading-relaxed">
          Answer a set of simple questions to assess your memory, attention and more.
        </p>
      </div>

      {/* Pill Badge */}
      <div className="inline-block bg-[#eaf7f4] text-[#0d9488] font-bold text-xs px-4 py-1.5 rounded-full border border-teal-100/80">
        Estimated Time: 8-10 Minutes
      </div>

      {/* Button Row */}
      <div className="pt-2 flex items-center justify-center gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="py-3 px-6 text-xs font-semibold text-gray-500 hover:text-gray-800 rounded-xl transition cursor-pointer"
          >
            &larr; Back
          </button>
        )}
        <button
          type="button"
          onClick={onBegin}
          className="py-3 px-8 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
        >
          Begin Screening &rarr;
        </button>
      </div>
    </div>
  );
}
