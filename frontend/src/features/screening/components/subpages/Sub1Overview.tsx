'use client';

import React from 'react';

interface Props {
  onStart: () => void;
  onViewHistory: () => void;
}

export default function Sub1Overview({ onStart, onViewHistory }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-8 shadow-xs max-w-4xl mx-auto space-y-8">
      {/* Top Banner with Brain Illustration */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Cognitive Screening
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md leading-relaxed">
            Keep track of your cognitive health with a quick and easy test.
          </p>
        </div>

        {/* Glowing Brain Circle Art */}
        <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-[#d4f3ed] to-[#b8ebe1] flex items-center justify-center shadow-inner shrink-0">
          <svg className="w-18 h-18 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z" />
          </svg>
        </div>
      </div>

      {/* 3 Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Duration */}
        <div className="p-5 rounded-2xl bg-[#f8fcfa] border border-teal-100/70 text-center space-y-1">
          <div className="w-8 h-8 rounded-full bg-teal-100 text-[#0d9488] mx-auto flex items-center justify-center text-sm font-bold">
            ⏱
          </div>
          <h3 className="text-sm font-bold text-gray-800">~ 10 min</h3>
          <p className="text-[11px] text-gray-500">Duration</p>
        </div>

        {/* Card 2: Tests */}
        <div className="p-5 rounded-2xl bg-[#f8fcfa] border border-teal-100/70 text-center space-y-1">
          <div className="w-8 h-8 rounded-full bg-teal-100 text-[#0d9488] mx-auto flex items-center justify-center text-sm font-bold">
            📊
          </div>
          <h3 className="text-sm font-bold text-gray-800">6 Tests</h3>
          <p className="text-[11px] text-gray-500">Included</p>
        </div>

        {/* Card 3: Safe & Private */}
        <div className="p-5 rounded-2xl bg-[#f8fcfa] border border-teal-100/70 text-center space-y-1">
          <div className="w-8 h-8 rounded-full bg-teal-100 text-[#0d9488] mx-auto flex items-center justify-center text-sm font-bold">
            🛡
          </div>
          <h3 className="text-sm font-bold text-gray-800">Safe & Private</h3>
          <p className="text-[11px] text-gray-500">Your data is secure</p>
        </div>
      </div>

      {/* Last Screening Ribbon */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#f0faf7] border border-teal-200/60">
        <div>
          <p className="text-[10px] uppercase font-bold text-[#0d9488] tracking-wider">
            Last Screening
          </p>
          <p className="text-xs font-semibold text-gray-800 mt-0.5">
            05 Nov 2026 • <strong>78%</strong>
          </p>
        </div>

        <button
          type="button"
          onClick={onViewHistory}
          className="text-xs font-bold text-[#0d9488] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View Results</span>
          <span>&rarr;</span>
        </button>
      </div>

      {/* CTA Button */}
      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={onStart}
          className="w-full max-w-sm py-3 px-8 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-md transition cursor-pointer"
        >
          Start Screening &rarr;
        </button>
      </div>
    </div>
  );
}

