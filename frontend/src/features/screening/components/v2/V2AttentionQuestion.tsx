'use client';

import React, { useState } from 'react';

export interface V2QuestionData {
  id: string;
  category: string;
  title: string;
  questionNumber: number;
  totalQuestions: number;
  sequence: string[];
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export const sampleQuestions: V2QuestionData[] = [
  {
    id: 'q-1',
    category: 'Attention & Focus',
    title: 'Which number comes next in the sequence?',
    questionNumber: 1,
    totalQuestions: 5,
    sequence: ['2', '4', '6', '8', '?'],
    options: ['10', '11', '12', '14'],
    correctAnswer: '10',
  },
  {
    id: 'q-2',
    category: 'Attention & Focus',
    title: 'Which number completes the pattern?',
    questionNumber: 2,
    totalQuestions: 5,
    sequence: ['5', '10', '15', '20', '?'],
    options: ['22', '25', '30', '35'],
    correctAnswer: '25',
  },
  {
    id: 'q-3',
    category: 'Attention & Focus',
    title: 'Find the missing number in the reverse sequence:',
    questionNumber: 3,
    totalQuestions: 5,
    sequence: ['30', '25', '20', '15', '?'],
    options: ['5', '8', '10', '12'],
    correctAnswer: '10',
  },
  {
    id: 'q-4',
    category: 'Attention & Focus',
    title: 'Identify the next term in the geometric progression:',
    questionNumber: 4,
    totalQuestions: 5,
    sequence: ['3', '6', '12', '24', '?'],
    options: ['36', '42', '48', '50'],
    correctAnswer: '48',
  },
  {
    id: 'q-5',
    category: 'Attention & Focus',
    title: 'Which number logically completes the series?',
    questionNumber: 5,
    totalQuestions: 5,
    sequence: ['1', '4', '9', '16', '?'],
    options: ['20', '24', '25', '30'],
    correctAnswer: '25',
  },
];

interface Props {
  onNext: () => void;
  onPrevious: () => void;
  onBackToOverview: () => void;
}

export default function V2AttentionQuestion({ onNext, onPrevious, onBackToOverview }: Props) {
  const [qIndex, setQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({
    0: '10',
  });

  const currentQ = sampleQuestions[qIndex];
  const selectedOption = selectedAnswers[qIndex];

  function handleSelect(opt: string) {
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: opt }));
  }

  function handleNextClick() {
    if (qIndex < sampleQuestions.length - 1) {
      setQIndex(prev => prev + 1);
    } else {
      onNext();
    }
  }

  function handlePrevClick() {
    if (qIndex > 0) {
      setQIndex(prev => prev - 1);
    } else {
      onPrevious();
    }
  }

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Top Header: Back Link + 3-Step Stepper + Countdown Timer matching screenshot 1 */}
      <div className="flex items-center justify-between pb-2">
        <button
          type="button"
          onClick={onBackToOverview}
          className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
        >
          <span>&larr;</span>
          <span>Back to Overview</span>
        </button>

        {/* 3-Step Line Stepper matching screenshot 1: (1) Questions -> (2) Review -> (3) Submit */}
        <div className="flex items-center gap-8 text-xs font-semibold">
          <div className="flex items-center gap-2 text-[#0d9488]">
            <span className="w-5 h-5 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-[10px] font-bold">
              1
            </span>
            <span>Questions</span>
          </div>
          <span className="h-0.5 w-12 bg-gray-200" />
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">
              2
            </span>
            <span>Review</span>
          </div>
          <span className="h-0.5 w-12 bg-gray-200" />
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">
              3
            </span>
            <span>Submit</span>
          </div>
        </div>

        {/* Green Timer Pill matching screenshot */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          <span>⏱</span>
          <span>09:45</span>
        </div>
      </div>

      {/* Main 2-Column Card: Left Glowing 3D Brain Avatar Profile + Right Question Card */}
      <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center gap-8">
        {/* Left Glowing Holographic Brain Human Profile matching screenshot 1 */}
        <div className="w-full md:w-72 h-88 rounded-3xl bg-gradient-to-tr from-[#d4f3ec] via-[#b9ecdf] to-[#99e2d1] flex flex-col items-center justify-center shadow-inner relative overflow-hidden shrink-0">
          <div className="w-48 h-48 rounded-full bg-white/40 blur-xl absolute" />
          
          {/* Glowing Green Brain Hologram SVG */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-36 h-36 rounded-full bg-white/90 shadow-md flex items-center justify-center border-2 border-teal-200/80 relative">
              <svg className="w-20 h-20 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z" />
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z" />
              </svg>
              {/* Synapse Pulse Dot */}
              <span className="absolute top-8 left-10 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            </div>

            <div className="mt-4 text-center">
              <span className="inline-block text-[11px] font-extrabold text-teal-900 bg-white/90 px-3.5 py-1 rounded-full shadow-2xs">
                Active Assessment
              </span>
              <p className="text-[10px] text-teal-800 font-semibold mt-1">
                Question {qIndex + 1} of {sampleQuestions.length}
              </p>
            </div>
          </div>
        </div>

        {/* Right Question Container matching screenshot 1 */}
        <div className="flex-1 space-y-6 w-full">
          {/* Badge & Title */}
          <div>
            <div className="flex items-center gap-2 text-[#0d9488] mb-1.5">
              <span className="w-5 h-5 rounded-md bg-teal-50 flex items-center justify-center text-xs">
                🧠
              </span>
              <span className="text-xs font-bold tracking-wider uppercase">
                {currentQ.category}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              {currentQ.title}
            </h2>
          </div>

          {/* Sequence Boxes (e.g. 2  4  6  8  ?) matching screenshot 1 */}
          <div className="flex items-center justify-center gap-3.5 py-3">
            {currentQ.sequence.map((item, idx) => (
              <div
                key={idx}
                className={`w-14 sm:w-16 h-18 rounded-2xl flex items-center justify-center font-extrabold text-2xl transition shadow-2xs ${
                  item === '?'
                    ? 'bg-[#0d9488] text-white ring-4 ring-teal-100 shadow-md'
                    : 'bg-[#eaf7f4] text-teal-900 border border-teal-100/90'
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          {/* 2x2 Radio Options Grid matching screenshot 1 */}
          <div className="grid grid-cols-2 gap-3.5 pt-1">
            {currentQ.options.map(opt => {
              const isSelected = selectedOption === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className={`p-4 rounded-2xl border-2 flex items-center gap-3.5 transition cursor-pointer ${
                    isSelected
                      ? 'border-[#0d9488] bg-teal-50/60 shadow-xs ring-2 ring-teal-100'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  {/* Radio circle */}
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-[#0d9488] bg-[#0d9488]' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                  <span className="text-sm font-bold text-gray-800">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between pt-5 border-t border-gray-100">
            <button
              type="button"
              onClick={handlePrevClick}
              disabled={qIndex === 0}
              className="py-2.5 px-5 text-xs font-semibold text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl transition cursor-pointer"
            >
              &larr; Previous
            </button>

            <button
              type="button"
              onClick={handleNextClick}
              disabled={!selectedOption}
              className="py-2.5 px-6 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <span>{qIndex === sampleQuestions.length - 1 ? 'Go to Memory Recall' : 'Next Question'}</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
