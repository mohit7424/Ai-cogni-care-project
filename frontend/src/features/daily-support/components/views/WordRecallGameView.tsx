'use client';

import React, { useState } from 'react';
import { mockWordRecallChallenges } from '../../data/dailySupport.data';

interface Props {
  onBackToActivities: () => void;
  onFinishExercise: () => void;
}

export default function WordRecallGameView({
  onBackToActivities,
  onFinishExercise,
}: Props) {
  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const [phase, setPhase] = useState<'study' | 'recall'>('study');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  const total = mockWordRecallChallenges.length;
  const current = mockWordRecallChallenges[challengeIndex];

  function toggleWord(word: string) {
    setSelectedWords(prev =>
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
  }

  function handleNext() {
    if (challengeIndex < total - 1) {
      setChallengeIndex(prev => prev + 1);
      setPhase('study');
      setSelectedWords([]);
    } else {
      onFinishExercise();
    }
  }

  function handlePrev() {
    if (challengeIndex > 0) {
      setChallengeIndex(prev => prev - 1);
      setPhase('study');
      setSelectedWords([]);
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
            {challengeIndex + 1} / {total}
          </span>
          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0d9488] rounded-full transition-all duration-300"
              style={{ width: `${((challengeIndex + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          <span>⏱</span>
          <span>04:45</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-[#0d9488]">
            <span className="text-base">🔤</span>
            <span className="text-xs font-bold uppercase tracking-wider">Word Recall Exercise</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {phase === 'study'
              ? 'Study & Memorize the Words'
              : 'Recall: Select the words that appeared in the list'}
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Panel */}
          <div className="md:col-span-8 p-6 rounded-3xl bg-[#f8fcfa] border border-teal-100/80 space-y-5">
            {phase === 'study' ? (
              <div className="space-y-6 text-center py-4">
                <p className="text-xs font-semibold text-gray-500">
                  Read these words carefully and remember them:
                </p>

                {/* Big Cards of Study Words */}
                <div className="flex flex-wrap justify-center gap-3">
                  {current.studyWords.map(word => (
                    <div
                      key={word}
                      className="px-6 py-4 rounded-2xl bg-white border-2 border-teal-200 shadow-sm font-extrabold text-lg text-teal-900"
                    >
                      {word}
                    </div>
                  ))}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setPhase('recall')}
                    className="py-3 px-8 bg-[#0d9488] hover:bg-[#0b8075] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                  >
                    I&apos;m Ready to Recall &rarr;
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs font-semibold text-gray-600">
                  Click on the words you remember studying:
                </p>

                {/* Recall Options Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {current.recallOptions.map(opt => {
                    const isSelected = selectedWords.includes(opt.word);
                    return (
                      <button
                        key={opt.word}
                        type="button"
                        onClick={() => toggleWord(opt.word)}
                        className={`p-3.5 rounded-2xl border-2 font-bold text-xs sm:text-sm transition cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-[#0d9488] bg-teal-50 text-[#0d9488] ring-2 ring-teal-200 shadow-xs'
                            : 'border-gray-200 hover:border-teal-300 bg-white text-gray-700'
                        }`}
                      >
                        <span>{opt.word}</span>
                        {isSelected && <span>✓</span>}
                      </button>
                    );
                  })}
                </div>

                <div className="text-[11px] text-gray-400 text-right">
                  Selected: {selectedWords.length} words
                </div>
              </div>
            )}
          </div>

          {/* Right Tips Panel */}
          <div className="md:col-span-4 p-6 rounded-3xl bg-gradient-to-br from-[#f2faf7] to-[#e6f7f3] border border-teal-200/80 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                Recall Tips
              </h3>
            </div>

            <div className="space-y-3 text-xs text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <p>Connect the words into a single narrative or visual scene.</p>
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
            disabled={challengeIndex === 0}
            className="py-2.5 px-5 text-xs font-semibold text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl transition cursor-pointer"
          >
            &larr; Previous
          </button>

          {phase === 'recall' ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={selectedWords.length === 0}
              className="py-2.5 px-6 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <span>{challengeIndex === total - 1 ? 'Complete Activity' : 'Next Challenge'}</span>
              <span>&rarr;</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setPhase('recall')}
              className="py-2.5 px-6 bg-[#0d9488] hover:bg-[#0b8075] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <span>Start Recall</span>
              <span>&rarr;</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

