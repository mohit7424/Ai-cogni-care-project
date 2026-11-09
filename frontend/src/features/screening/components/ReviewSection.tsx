'use client';

import React from 'react';
import type { ScreeningQuestion } from '../types/screening.types';

interface ReviewSectionProps {
  questions: ScreeningQuestion[];
  answers: Record<string, string>;
  onEditQuestion: (index: number) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export default function ReviewSection({
  questions,
  answers,
  onEditQuestion,
  onSubmit,
  isSubmitting = false,
}: ReviewSectionProps) {
  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = answeredCount === questions.length;

  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0d9488] bg-teal-50 px-2.5 py-1 rounded-full">
            Step 3 of 4
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">
            Review Your Assessment Answers
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Please verify your selections before submitting for clinician review.
          </p>
        </div>

        <div className="text-right">
          <span className="text-sm font-extrabold text-[#0d9488]">
            {answeredCount} / {questions.length}
          </span>
          <p className="text-[10px] text-gray-400">Answered</p>
        </div>
      </div>

      {/* Answers Summary List */}
      <div className="space-y-3">
        {questions.map((q, idx) => {
          const selectedOptId = answers[q.id];
          const selectedOption = q.options.find(o => o.id === selectedOptId);

          return (
            <div
              key={q.id}
              className="p-4 rounded-2xl border border-gray-100 bg-[#fbfdfc] flex items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-800">
                    Q{idx + 1}. {q.title}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-[#0d9488] bg-teal-50 px-2 py-0.5 rounded-full">
                    {q.category}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Selected: <strong className="text-teal-900">{selectedOption?.label ?? 'Not answered yet'}</strong>
                </p>
              </div>

              <button
                type="button"
                onClick={() => onEditQuestion(idx)}
                className="text-xs font-semibold text-[#0d9488] hover:underline shrink-0 cursor-pointer"
              >
                Change
              </button>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          {!isAllAnswered && '⚠️ Please complete all questions before submitting.'}
        </p>

        <button
          type="button"
          onClick={onSubmit}
          disabled={!isAllAnswered || isSubmitting}
          className="py-3 px-6 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
        >
          {isSubmitting ? (
            <span>Analyzing Results...</span>
          ) : (
            <>
              <span>Submit for Clinical Scoring</span>
              <span>&rarr;</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

