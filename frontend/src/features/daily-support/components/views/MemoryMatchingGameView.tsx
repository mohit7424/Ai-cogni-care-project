'use client';

import React, { useState } from 'react';

interface Props {
  onBackToActivities: () => void;
  onFinishExercise: () => void;
}

export default function MemoryMatchingGameView({
  onBackToActivities,
  onFinishExercise,
}: Props) {
  // 6 Card Grid (Tree, Brain, Star, Brain, Apple, Brain) matching Screen 3
  const [cards, setCards] = useState([
    { id: 1, content: '🌳', revealed: true },
    { id: 2, content: '🧠', revealed: false },
    { id: 3, content: '⭐', revealed: true },
    { id: 4, content: '🧠', revealed: false },
    { id: 5, content: '🍎', revealed: true },
    { id: 6, content: '🧠', revealed: false },
  ]);

  function handleCardClick(idx: number) {
    setCards(prev =>
      prev.map((c, i) => (i === idx ? { ...c, revealed: !c.revealed } : c))
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header with Back, Stepper Progress (1/5) & Timer (04:30) */}
      <div className="flex items-center justify-between pb-1">
        <button
          type="button"
          onClick={onBackToActivities}
          className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
        >
          <span>&larr;</span>
          <span>Back to Activities</span>
        </button>

        {/* Progress Bar 1/5 */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-700">1 / 5</span>
          <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="w-1/5 h-full bg-[#0d9488] rounded-full" />
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          <span>⏱</span>
          <span>04:30</span>
        </div>
      </div>

      {/* Main Exercise Box: Centered Title + 3x2 Memory Grid & Tips Card */}
      <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-[#0d9488]">
            <span className="text-base">🧠</span>
            <span className="text-xs font-bold uppercase tracking-wider">Memory Matching</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Memorize the images and match the pairs.
          </h2>
        </div>

        {/* 2-Column Area: Memory Card Board & Right Tips Panel matching Screen 3 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
          {/* 3x2 Memory Card Board */}
          <div className="md:col-span-8 p-3 sm:p-6 rounded-3xl bg-[#f8fcfa] dark:bg-[#071f1a] border border-teal-100/80 dark:border-[#154c40]">
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {cards.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleCardClick(i)}
                  className={`h-20 sm:h-28 rounded-2xl border-2 flex items-center justify-center text-2xl sm:text-4xl shadow-2xs transition-all duration-200 cursor-pointer ${
                    c.revealed
                      ? 'bg-white dark:bg-[#0c2b24] border-teal-200 dark:border-[#1d5d51] shadow-sm'
                      : 'bg-gradient-to-tr from-[#e8f7f4] to-[#d4f2ec] dark:from-[#0a2f27] dark:to-[#0f3d33] border-teal-100 dark:border-[#14483e] text-teal-400 hover:scale-105'
                  }`}
                >
                  {c.revealed ? c.content : '🧠'}
                </button>
              ))}
            </div>
          </div>

          {/* Right Tips Panel matching screenshot */}
          <div className="md:col-span-4 p-6 rounded-3xl bg-gradient-to-br from-[#f2faf7] to-[#e6f7f3] border border-teal-200/80 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                Tips
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2 text-xs text-gray-700">
                <span className="text-[#0d9488] font-bold">✓</span>
                <p>Look carefully at the images.</p>
              </div>

              <div className="flex items-start gap-2 text-xs text-gray-700">
                <span className="text-[#0d9488] font-bold">✓</span>
                <p>Try to remember their positions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onBackToActivities}
            className="py-2.5 px-5 text-xs font-semibold text-gray-500 hover:text-gray-800 rounded-xl transition cursor-pointer"
          >
            &larr; Previous
          </button>

          <button
            type="button"
            onClick={onFinishExercise}
            className="py-2.5 px-6 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

