'use client';

import React, { useState } from 'react';

interface Props {
  onNext: (selectedWords: string[]) => void;
  onPrevious: () => void;
}

export default function Sub5MemoryQuestion({ onNext, onPrevious }: Props) {
  const [selectedWords, setSelectedWords] = useState<string[]>(['Apple', 'Tree']);

  const words = ['Apple', 'Car', 'Tree', 'Book'];

  function toggleWord(word: string) {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-8 shadow-xs max-w-2xl mx-auto space-y-6">
      {/* Top Stepper Indicator */}
      <div className="flex items-center justify-between text-xs text-gray-400 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#0d9488] text-white flex items-center justify-center font-bold text-[10px]">
            1
          </span>
          <span className="h-0.5 w-6 bg-[#0d9488]" />
          <span className="w-5 h-5 rounded-full bg-[#0d9488] text-white flex items-center justify-center font-bold text-[10px]">
            2
          </span>
        </div>
        <span className="font-semibold text-gray-600">Question 3 of 20</span>
      </div>

      {/* Memory Prompt Heading */}
      <div className="text-center space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Remember these 3 words:
        </h2>

        {/* 3 Visual Item Cards (Apple 🍎, Car 🚗, Tree 🌳) matching screenshot */}
        <div className="flex items-center justify-center gap-4 py-3">
          <div className="w-20 h-24 rounded-2xl bg-[#f8fcfa] border border-teal-100 flex flex-col items-center justify-center shadow-xs">
            <span className="text-3xl">🍎</span>
            <span className="text-xs font-bold text-gray-700 mt-1">Apple</span>
          </div>

          <div className="w-20 h-24 rounded-2xl bg-[#f8fcfa] border border-teal-100 flex flex-col items-center justify-center shadow-xs">
            <span className="text-3xl">🚗</span>
            <span className="text-xs font-bold text-gray-700 mt-1">Car</span>
          </div>

          <div className="w-20 h-24 rounded-2xl bg-[#f8fcfa] border border-teal-100 flex flex-col items-center justify-center shadow-xs">
            <span className="text-3xl">🌳</span>
            <span className="text-xs font-bold text-gray-700 mt-1">Tree</span>
          </div>
        </div>
      </div>

      {/* Checkboxes Area */}
      <div className="space-y-2 pt-2">
        <p className="text-xs font-semibold text-gray-600">
          Select the words you remember:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {words.map(w => {
            const isChecked = selectedWords.includes(w);
            return (
              <label
                key={w}
                className={`flex items-center gap-2 p-3 rounded-xl border transition cursor-pointer select-none ${
                  isChecked
                    ? 'border-[#0d9488] bg-teal-50/60 font-bold text-[#0d9488]'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleWord(w)}
                  className="w-4 h-4 rounded text-[#0d9488] border-gray-300 focus:ring-[#0d9488]"
                />
                <span className="text-xs">{w}</span>
              </label>
            );
          })}
        </div>
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
          onClick={() => onNext(selectedWords)}
          className="py-2.5 px-6 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}

