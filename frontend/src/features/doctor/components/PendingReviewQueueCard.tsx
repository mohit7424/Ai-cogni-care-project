'use client';

import React from 'react';
import type { PendingAssessmentItem } from '../types/doctor.types';

interface Props {
  assessments: PendingAssessmentItem[];
  onReview: (assessment: PendingAssessmentItem) => void;
  onViewAll?: () => void;
}

export default function PendingReviewQueueCard({
  assessments,
  onReview,
  onViewAll,
}: Props) {
  return (
    <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-[#154c40]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center">
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-extrabold text-gray-900 dark:text-white tracking-tight">
              Assessment Work Queue
            </h2>
            <p className="text-[11px] text-gray-400">
              Screenings awaiting doctor clinical observation &amp; sign-off
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-bold text-[#0d9488] dark:text-[#2dd4bf] hover:underline cursor-pointer"
        >
          View All ({assessments.length}) &rarr;
        </button>
      </div>

      {/* List */}
      <div className="space-y-3 overflow-y-auto max-h-[340px] pr-1">
        {assessments.length === 0 ? (
          <div className="py-8 text-center text-gray-400 text-xs">
            🎉 All pending assessments have been reviewed!
          </div>
        ) : (
          assessments.map(asm => {
            const isScoreLow = asm.totalScore < 24;

            return (
              <div
                key={asm.id}
                className="p-3.5 rounded-2xl bg-[#f8fcfa] dark:bg-[#071f1a] border border-teal-100/60 dark:border-[#154c40] hover:border-teal-300 dark:hover:border-teal-600 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-xs sm:text-sm text-gray-900 dark:text-white">
                      {asm.patientName}
                    </span>
                    <span className="font-mono text-[10px] text-gray-400 bg-gray-100 dark:bg-[#0e352d] px-1.5 py-0.5 rounded">
                      {asm.patientCode}
                    </span>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">
                      • {asm.age} yrs
                    </span>
                  </div>

                  <p className="text-xs text-teal-800 dark:text-teal-300 font-semibold">
                    {asm.instrument} • <span className="text-gray-400 font-normal">{asm.completionDate}</span>
                  </p>

                  {asm.flagReason && (
                    <div className="flex items-center gap-1.5 text-[10.5px] font-semibold text-rose-600 dark:text-rose-400 pt-0.5">
                      <span>⚠</span>
                      <span>{asm.flagReason}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  {/* Score Pill */}
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-lg font-black ${
                          isScoreLow ? 'text-rose-600' : 'text-[#0a3832] dark:text-teal-200'
                        }`}
                      >
                        {asm.totalScore}
                      </span>
                      <span className="text-[10px] text-gray-400">/ {asm.maxScore}</span>
                    </div>
                    <span
                      className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                        asm.status === 'Reviewed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300'
                      }`}
                    >
                      {asm.status}
                    </span>
                  </div>

                  {/* Review Action Button */}
                  <button
                    type="button"
                    onClick={() => onReview(asm)}
                    className="px-3 py-2 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer shrink-0"
                  >
                    {asm.status === 'Reviewed' ? 'View Record' : 'Review & Sign'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

