'use client';

import React from 'react';

interface Props {
  onBack: () => void;
  onSubmit: () => void;
}

export default function V2ReviewAnswers({ onBack, onSubmit }: Props) {
  const sections = [
    { title: 'General Knowledge', score: '5 / 5 Correct' },
    { title: 'Attention & Focus', score: '4 / 5 Correct' },
    { title: 'Memory Recall', score: '6 / 6 Correct' },
  ];

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Main Grid: Left Review Summary List & Right Ready To Submit Box matching screenshot 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Review Panel */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center font-bold text-sm">
              📋
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                Review Your Answers
              </h2>
              <p className="text-xs text-gray-500">
                Please review your answers before submitting the screening.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {sections.map((sec, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#f8fcfa] border border-teal-100/70"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-teal-100/70 text-[#0d9488] flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                  <span className="text-xs font-bold text-gray-800">{sec.title}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-lg">
                    {sec.score}
                  </span>
                  <button
                    type="button"
                    onClick={onBack}
                    className="text-xs font-bold text-[#0d9488] hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Back Button */}
          <div className="pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onBack}
              className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
            >
              <span>&larr;</span>
              <span>Back</span>
            </button>
          </div>
        </div>

        {/* Right Timer & Submit Panel matching screenshot 3 */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-teal-100/80 p-6 shadow-xs text-center space-y-5">
          {/* Total Time Dial */}
          <div className="p-4 rounded-2xl bg-[#f0faf7] border border-teal-100">
            <span className="text-2xl">⏱</span>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">
              Total Time
            </p>
            <h4 className="text-lg font-extrabold text-[#0d9488]">12 min 35 sec</h4>
          </div>

          {/* Status Box */}
          <div className="space-y-1">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center text-xs font-bold">
              ✓
            </div>
            <h5 className="text-xs font-bold text-gray-800">Ready to Submit</h5>
            <p className="text-[11px] text-gray-400">Your answers are complete.</p>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={onSubmit}
            className="w-full py-3 px-4 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition cursor-pointer"
          >
            Submit Screening &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

