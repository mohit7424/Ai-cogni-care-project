'use client';

import React from 'react';

interface Props {
  onBackToEdit: () => void;
  onSubmit: () => void;
}

export default function Sub6ReviewAnswers({ onBackToEdit, onSubmit }: Props) {
  const reviews = [
    { num: 'Q1', q: 'What is the color of the sky?', a: 'Blue' },
    { num: 'Q2', q: 'Remember: Apple, Car, Tree', a: 'Apple, Tree' },
    { num: 'Q3', q: 'What comes next? 2, 4, 6, ?', a: '8' },
    { num: 'Q4', q: 'Select the correct animal', a: 'Dog' },
    { num: 'Q5', q: 'True or False: 5 > 3', a: 'True' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-8 shadow-xs max-w-2xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Review Your Answers
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Please confirm your answers before submitting.
        </p>
      </div>

      {/* Answers List with Green Checkmarks matching screenshot */}
      <div className="space-y-3">
        {reviews.map(item => (
          <div
            key={item.num}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f9fdfc] border border-teal-50"
          >
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                ✓
              </span>
              <span className="text-xs font-semibold text-gray-800">
                {item.num}. {item.q}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0d9488] bg-teal-50 px-2.5 py-1 rounded-lg">
                {item.a}
              </span>
              <button
                type="button"
                onClick={onBackToEdit}
                className="text-gray-400 hover:text-gray-600 text-xs"
              >
                &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={onBackToEdit}
          className="py-2.5 px-5 text-xs font-semibold text-gray-500 hover:text-gray-800 rounded-xl transition cursor-pointer"
        >
          &larr; Back to Edit
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="py-2.5 px-6 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
        >
          Submit Screening &rarr;
        </button>
      </div>
    </div>
  );
}

