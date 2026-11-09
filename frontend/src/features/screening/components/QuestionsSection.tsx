'use client';

import React from 'react';
import type { ScreeningQuestion } from '../types/screening.types';

interface QuestionsSectionProps {
  questions: ScreeningQuestion[];
  currentIndex: number;
  selectedAnswers: Record<string, string>;
  onSelectAnswer: (questionId: string, optionId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function QuestionsSection({
  questions,
  currentIndex,
  selectedAnswers,
  onSelectAnswer,
  onNext,
  onPrevious,
}: QuestionsSectionProps) {
  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  const total = questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / total) * 100);
  const selectedOptionId = selectedAnswers[currentQ.id];

  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto space-y-6">
      {/* Top progress indicators */}
      <div>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span className="font-bold text-[#0d9488] uppercase tracking-wider text-[10px] bg-teal-50 px-2.5 py-1 rounded-full">
            {currentQ.category}
          </span>
          <span className="font-semibold text-gray-700">
            Question {currentIndex + 1} of {total}
          </span>
        </div>
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-400 to-[#0d9488] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Details */}
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          {currentQ.title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed bg-[#f8fcfa] border border-teal-50 p-4 rounded-2xl">
          {currentQ.instruction}
        </p>
      </div>

      {/* Options List */}
      <div className="space-y-3 pt-2">
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedOptionId === opt.id;
          const letter = String.fromCharCode(65 + idx);

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectAnswer(currentQ.id, opt.id)}
              className={`w-full flex items-center gap-3.5 p-4 rounded-2xl border-2 text-left transition cursor-pointer ${
                isSelected
                  ? 'border-[#0d9488] bg-teal-50/50 shadow-xs'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 bg-white'
              }`}
            >
              <span
                className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition ${
                  isSelected ? 'bg-[#0d9488] text-white shadow-xs' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {letter}
              </span>
              <span className={`text-xs sm:text-sm font-semibold ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="py-2.5 px-4 text-xs font-semibold text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1.5 cursor-pointer"
        >
          <span>&larr;</span>
          <span>Previous</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!selectedOptionId}
          className="py-2.5 px-6 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
        >
          <span>{currentIndex === total - 1 ? 'Go to Review' : 'Next Question'}</span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}

