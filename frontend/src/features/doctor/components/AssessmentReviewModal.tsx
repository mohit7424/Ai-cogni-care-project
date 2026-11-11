'use client';

import React, { useState } from 'react';
import type { PendingAssessmentItem } from '../types/doctor.types';

interface Props {
  isOpen: boolean;
  assessment: PendingAssessmentItem | null;
  onClose: () => void;
  onFinalizeReview: (assessmentId: string, observation: string) => void;
}

export default function AssessmentReviewModal({
  isOpen,
  assessment,
  onClose,
  onFinalizeReview,
}: Props) {
  const [observationText, setObservationText] = useState<string>(
    assessment?.doctorObservationDraft || ''
  );
  const [activeTab, setActiveTab] = useState<'domains' | 'responses'>('domains');

  if (!isOpen || !assessment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100 dark:border-[#154c40] p-5 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 dark:border-[#154c40] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-[#0d3b32] text-[#0d9488] dark:text-[#2dd4bf] flex items-center justify-center text-sm font-bold">
                🧠
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white">
                Clinical Assessment Review: {assessment.patientName}
              </h2>
              <span className="text-xs font-mono font-bold text-gray-400 bg-gray-100 dark:bg-[#0e352d] px-2 py-0.5 rounded">
                {assessment.patientCode}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {assessment.instrument} • Completed: {assessment.completionDate} ({assessment.durationMinutes} mins)
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Top Score Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#eefaf6] to-[#e1f5ef] dark:from-[#0d3b32] dark:to-[#124d41] border border-teal-100 dark:border-[#154c40] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
              Preliminary Clinical Score
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#0a3832] dark:text-white">
                {assessment.totalScore}
              </span>
              <span className="text-xs font-semibold text-gray-400">
                / {assessment.maxScore} (86.6%)
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-white dark:bg-[#0c2b24] text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                • Normal Cognitive Range
              </span>
            </div>
          </div>

          <p className="text-xs text-teal-900 dark:text-teal-200 max-w-sm italic">
            &ldquo;{assessment.preliminaryInterpretation}&rdquo;
          </p>
        </div>

        {/* Tab Switcher: Domain Breakdown vs Response Inspector */}
        <div className="flex items-center gap-2 border-b border-gray-100 dark:border-[#154c40] pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('domains')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'domains'
                ? 'bg-[#0d9488] text-white shadow-xs'
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-[#124138]'
            }`}
          >
            MMSE Domain Breakdown
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('responses')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'responses'
                ? 'bg-[#0d9488] text-white shadow-xs'
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-[#124138]'
            }`}
          >
            Original Patient Responses ({assessment.patientResponses.length})
          </button>
        </div>

        {/* Tab 1: Domain Breakdown */}
        {activeTab === 'domains' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {assessment.domains.map(d => (
              <div
                key={d.domain}
                className="p-3.5 rounded-2xl bg-gray-50/70 dark:bg-[#071f1a] border border-gray-100 dark:border-[#154c40] space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-800 dark:text-white">{d.domain}</span>
                  <span className="font-extrabold text-[#0d9488] dark:text-[#2dd4bf]">
                    {d.score} / {d.maxScore}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-[#0e352d] h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      d.status === 'Needs Attention' ? 'bg-amber-500' : 'bg-[#0d9488]'
                    }`}
                    style={{ width: `${(d.score / d.maxScore) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>Target: ≥80%</span>
                  <span className={d.status === 'Needs Attention' ? 'text-amber-500 font-bold' : 'text-emerald-600'}>
                    {d.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Response Inspector */}
        {activeTab === 'responses' && (
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {assessment.patientResponses.map((r, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-gray-50 dark:bg-[#071f1a] border border-gray-100 dark:border-[#154c40] text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-bold text-gray-800 dark:text-white">
                  <span>Q{idx + 1}: {r.question}</span>
                  <span className="text-[#0d9488]">Score: {r.scoreGiven} pts</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong className="text-gray-400">Response:</strong> &ldquo;{r.response}&rdquo;
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Doctor Clinical Observations Textarea */}
        <div className="space-y-1.5 pt-2">
          <label className="block text-xs font-bold text-gray-800 dark:text-white">
            Doctor Observations &amp; Clinical Recommendation (Traceable on record)
          </label>
          <textarea
            rows={3}
            value={observationText}
            onChange={e => setObservationText(e.target.value)}
            placeholder="Add structured neurological observations, medication adjustments, or recommended follow-up date..."
            className="w-full p-3 rounded-2xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-xs text-gray-800 dark:text-white placeholder:text-gray-400 outline-none focus:border-[#0d9488]"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-gray-100 dark:border-[#154c40]">
          <span className="text-[11px] text-gray-400">
            Sign-off reviewer: <strong>Dr. Sarah Jenkins (MCI-REG-847291)</strong>
          </span>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-200 dark:border-[#19584b] text-gray-600 dark:text-gray-300 text-xs font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onFinalizeReview(assessment.id, observationText)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0d9488] hover:bg-[#0b8075] text-white text-xs font-bold shadow-md shadow-teal-900/10 cursor-pointer"
            >
              Finalize &amp; Sign Review ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

