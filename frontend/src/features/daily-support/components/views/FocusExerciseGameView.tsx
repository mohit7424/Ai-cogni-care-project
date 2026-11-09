'use client';

import React, { useState } from 'react';
import { mockFocusExerciseChallenges } from '../../data/dailySupport.data';

interface Props {
  onBackToActivities: () => void;
  onFinishExercise: () => void;
}

export default function FocusExerciseGameView({
  onBackToActivities,
  onFinishExercise,
}: Props) {
  const [index, setIndex] = useState<number>(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const total = mockFocusExerciseChallenges.length;
  const current = mockFocusExerciseChallenges[index];

  function handleTileClick(tileIndex: number) {
    setSelectedIndices(prev =>
      prev.includes(tileIndex)
        ? prev.filter(i => i !== tileIndex)
        : [...prev, tileIndex]
    );
  }

  function handleNext() {
    if (index < total - 1) {
      setIndex(prev => prev + 1);
      setSelectedIndices([]);
    } else {
      onFinishExercise();
    }
  }

  function handlePrev() {
    if (index > 0) {
      setIndex(prev => prev - 1);
      setSelectedIndices([]);
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-1">
        <button
          type="button"
          onClick={onBackToActivities}
          className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
        >
          <span>&larr;</span>
          <span>Back to Activities</span>
        </button>

        {/* Progress Bar */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-700">
            {index + 1} / {total}
          </span>
          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0d9488] rounded-full transition-all duration-300"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          <span>⏱</span>
          <span>04:00</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-[#0d9488]">
            <span className="text-base">🧠</span>
            <span className="text-xs font-bold uppercase tracking-wider">Focus & Concentration</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {current.title}
          </h2>
          <p className="text-xs text-gray-500">
            Tap all the target symbols <strong className="text-teal-700 text-sm">{current.targetSymbol}</strong> hidden in the grid below.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Focus Grid Panel */}
          <div className="md:col-span-8 p-6 rounded-3xl bg-[#f8fcfa] border border-teal-100/80 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 pb-1">
              <span>Target Symbol: <span className="text-xl">{current.targetSymbol}</span></span>
              <span className="text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                Found: {selectedIndices.length} / {current.targetCount}
              </span>
            </div>

            {/* 4x4 Grid of symbols */}
            <div className="grid grid-cols-4 gap-3">
              {current.gridSymbols.map((sym, idx) => {
                const isSelected = selectedIndices.includes(idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleTileClick(idx)}
                    className={`h-20 rounded-2xl border-2 flex items-center justify-center text-3xl transition cursor-pointer ${
                      isSelected
                        ? 'border-[#0d9488] bg-teal-100/80 shadow-md scale-105 ring-2 ring-teal-200'
                        : 'border-gray-200 hover:border-teal-200 bg-white shadow-2xs hover:scale-102'
                    }`}
                  >
                    {sym}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Tips Panel */}
          <div className="md:col-span-4 p-6 rounded-3xl bg-gradient-to-br from-[#f2faf7] to-[#e6f7f3] border border-teal-200/80 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                Focus Tips
              </h3>
            </div>

            <div className="space-y-3 text-xs text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <p>Move your eyes systematically in a reading pattern (left-to-right, top-to-bottom).</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <p>{current.hint}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={handlePrev}
            disabled={index === 0}
            className="py-2.5 px-5 text-xs font-semibold text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl transition cursor-pointer"
          >
            &larr; Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={selectedIndices.length === 0}
            className="py-2.5 px-6 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <span>{index === total - 1 ? 'Finish Focus Round' : 'Next Focus Round'}</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

