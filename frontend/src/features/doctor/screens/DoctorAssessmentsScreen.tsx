'use client';

import React, { useState } from 'react';
import { useDoctor } from '../hooks/useDoctor';
import { AssessmentReviewModal } from '../components';

export default function DoctorAssessmentsScreen() {
  const {
    data,
    selectedAssessment,
    isAssessmentModalOpen,
    setIsAssessmentModalOpen,
    handleOpenAssessmentReview,
    handleFinalizeReview,
  } = useDoctor();

  const [activeTab, setActiveTab] = useState<'pending' | 'reviewed' | 'all'>('pending');

  if (!data) return null;

  const assessments = data.pendingAssessments.filter(a => {
    if (activeTab === 'pending') return a.status === 'Pending Review';
    if (activeTab === 'reviewed') return a.status === 'Reviewed';
    return true;
  });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a3832] dark:text-white tracking-tight">
          Cognitive Assessment Review Center
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Review, annotate, and digitally sign completed MMSE &amp; MoCA cognitive batteries
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-100 dark:border-[#154c40] pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'pending'
              ? 'bg-[#0d9488] text-white shadow-xs'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#124138]'
          }`}
        >
          Pending Review ({data.pendingAssessments.filter(a => a.status === 'Pending Review').length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('reviewed')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'reviewed'
              ? 'bg-[#0d9488] text-white shadow-xs'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#124138]'
          }`}
        >
          Reviewed &amp; Signed
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#0d9488] text-white shadow-xs'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#124138]'
          }`}
        >
          All ({data.pendingAssessments.length})
        </button>
      </div>

      {/* Assessment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assessments.map(asm => (
          <div
            key={asm.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#0c2b24] border border-teal-100/80 dark:border-[#154c40] space-y-4 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                  {asm.patientName}
                </span>
                <span className="font-mono text-[10px] text-gray-400 bg-gray-100 dark:bg-[#071f1a] px-2 py-0.5 rounded">
                  {asm.patientCode}
                </span>
              </div>

              <div className="flex items-baseline justify-between p-3 rounded-2xl bg-teal-50/70 dark:bg-[#071f1a] border border-teal-100 dark:border-[#154c40]">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Preliminary Score</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-[#0a3832] dark:text-white">
                      {asm.totalScore}
                    </span>
                    <span className="text-xs text-gray-400">/ {asm.maxScore}</span>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    asm.status === 'Reviewed'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {asm.status}
                </span>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                {asm.instrument} • Completed: {asm.completionDate}
              </p>

              {asm.flagReason && (
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-[11px] text-rose-700 dark:text-rose-300 font-semibold border border-rose-200">
                  ⚠ {asm.flagReason}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleOpenAssessmentReview(asm)}
              className="w-full py-2.5 rounded-xl bg-[#0d9488] hover:bg-[#0b8075] text-white text-xs font-bold transition cursor-pointer text-center"
            >
              {asm.status === 'Reviewed' ? 'Inspect Clinical Record' : 'Open Review & Finalize'}
            </button>
          </div>
        ))}
      </div>

      <AssessmentReviewModal
        isOpen={isAssessmentModalOpen}
        assessment={selectedAssessment}
        onClose={() => setIsAssessmentModalOpen(false)}
        onFinalizeReview={handleFinalizeReview}
      />
    </div>
  );
}

