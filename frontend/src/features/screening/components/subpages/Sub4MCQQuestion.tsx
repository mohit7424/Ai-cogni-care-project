'use client';

import React, { useState } from 'react';

interface Props {
  onNext: (selected: string) => void;
  onPrevious: () => void;
}

export default function Sub4MCQQuestion({ onNext, onPrevious }: Props) {
  const [selectedColor, setSelectedColor] = useState<string>('Blue');

  const options = [
    { id: 'blue', label: 'Blue', colorDot: 'bg-blue-500' },
    { id: 'yellow', label: 'Yellow', colorDot: 'bg-yellow-400' },
    { id: 'green', label: 'Green', colorDot: 'bg-emerald-500' },
    { id: 'red', label: 'Red', colorDot: 'bg-red-500' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-8 shadow-xs max-w-2xl mx-auto space-y-6">
      {/* Top Stepper Indicator */}
      <div className="flex items-center justify-between text-xs text-gray-400 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#0d9488] text-white flex items-center justify-center font-bold text-[10px]">
            1
          </span>
          <span className="h-0.5 w-6 bg-[#0d9488]" />
          <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-[10px]">
            2
          </span>
        </div>
        <span className="font-semibold text-gray-600">Question 1 of 20</span>
      </div>

      {/* Question Heading */}
      <div className="text-center py-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          What is the color of the sky?
        </h2>
      </div>

      {/* 2x2 Grid of Color Cards matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {options.map(opt => {
          const isSelected = selectedColor === opt.label;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedColor(opt.label)}
              className={`p-4 rounded-2xl border-2 flex items-center justify-between transition cursor-pointer ${
                isSelected
                  ? 'border-[#0d9488] bg-teal-50/50 shadow-xs'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-4 h-4 rounded-full ${opt.colorDot} shrink-0 shadow-xs`} />
                <span className="text-xs sm:text-sm font-bold text-gray-800">
                  {opt.label}
                </span>
              </div>
              {isSelected && (
                <span className="w-5 h-5 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={onPrevious}
          className="py-2.5 px-5 text-xs font-semibold text-gray-500 hover:text-gray-800 rounded-xl transition cursor-pointer"
        >
          &larr; Previous
        </button>

        <button
          type="button"
          onClick={() => onNext(selectedColor)}
          className="py-2.5 px-6 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}

