'use client';

import React, { useState } from 'react';
import { mockLogicPuzzles } from '../../data/dailySupport.data';

interface Props {
  onBackToActivities: () => void;
  onFinishExercise: () => void;
}

export default function LogicPuzzleGameView({
  onBackToActivities,
  onFinishExercise,
}: Props) {
  const [puzzleIndex, setPuzzleIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const currentPuzzle = mockLogicPuzzles[puzzleIndex];
  const selectedOption = selectedAnswers[puzzleIndex];
  const total = mockLogicPuzzles.length;

  function handleSelect(opt: string) {
    setSelectedAnswers(prev => ({ ...prev, [puzzleIndex]: opt }));
    setShowExplanation(true);
  }

  function handleNext() {
    if (puzzleIndex < total - 1) {
      setPuzzleIndex(prev => prev + 1);
      setShowExplanation(false);
    } else {
      onFinishExercise();
    }
  }

  function handlePrev() {
    if (puzzleIndex > 0) {
      setPuzzleIndex(prev => prev - 1);
      setShowExplanation(false);
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header with Back, Stepper Progress & Timer */}
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
            {puzzleIndex + 1} / {total}
          </span>
          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0d9488] rounded-full transition-all duration-300"
              style={{ width: `${((puzzleIndex + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          <span>⏱</span>
          <span>06:15</span>
        </div>
      </div>

      {/* Main Exercise Box */}
      <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-[#0d9488]">
            <span className="text-base">🧩</span>
            <span className="text-xs font-bold uppercase tracking-wider">Logic Puzzle Challenge</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {currentPuzzle.title}
          </h2>
        </div>

        {/* 2-Column Grid: Left Question & Options + Right Tips Panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Panel */}
          <div className="md:col-span-8 p-6 rounded-3xl bg-[#f8fcfa] border border-teal-100/80 space-y-5">
            {/* Scenario Description Card */}
            <div className="p-4 rounded-2xl bg-white border border-teal-100/70 shadow-2xs">
              <p className="text-sm font-semibold text-gray-800 leading-relaxed">
                {currentPuzzle.description}
              </p>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-3">
              {currentPuzzle.options.map(opt => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === currentPuzzle.correctAnswer;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-center justify-between text-xs sm:text-sm font-semibold transition cursor-pointer ${
                      isSelected
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-50/70 text-emerald-900 shadow-xs'
                          : 'border-amber-400 bg-amber-50/70 text-amber-900 shadow-xs'
                        : 'border-gray-200 hover:border-teal-300 bg-white text-gray-700'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white bg-[#0d9488]">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation card after answering */}
            {showExplanation && (
              <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200 text-xs text-teal-900 space-y-1 animate-fadeIn">
                <span className="font-bold">Explanation:</span>
                <p>{currentPuzzle.explanation}</p>
              </div>
            )}
          </div>

          {/* Right Tips Panel */}
          <div className="md:col-span-4 p-6 rounded-3xl bg-gradient-to-br from-[#f2faf7] to-[#e6f7f3] border border-teal-200/80 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                Reasoning Tips
              </h3>
            </div>

            <div className="space-y-3 text-xs text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <p>Read the premises one by one before concluding.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <p>{currentPuzzle.hint}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={handlePrev}
            disabled={puzzleIndex === 0}
            className="py-2.5 px-5 text-xs font-semibold text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl transition cursor-pointer"
          >
            &larr; Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!selectedOption}
            className="py-2.5 px-6 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <span>{puzzleIndex === total - 1 ? 'Complete Puzzle' : 'Next Question'}</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

