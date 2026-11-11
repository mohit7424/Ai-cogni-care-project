'use client';

import React from 'react';
import type { AttentionQueueItem } from '../types/doctor.types';

interface Props {
  items: AttentionQueueItem[];
  onActionClick: (item: AttentionQueueItem) => void;
}

export default function AttentionQueueCard({ items, onActionClick }: Props) {
  return (
    <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-[#154c40]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center">
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-extrabold text-gray-900 dark:text-white tracking-tight">
              Clinician Attention Queue
            </h2>
            <p className="text-[11px] text-gray-400">
              Patients flagged by configured threshold drops or emergency alerts
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
          {items.length} Flagged
        </span>
      </div>

      {/* List */}
      <div className="space-y-3 overflow-y-auto max-h-[340px] pr-1">
        {items.map(item => {
          const isHigh = item.severity === 'High';

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isHigh
                  ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-900/60'
                  : 'bg-amber-50/30 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-900/60'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-xs sm:text-sm text-gray-900 dark:text-white">
                    {item.patientName}
                  </span>
                  <span className="font-mono text-[10px] text-gray-400 bg-white dark:bg-[#0c2b24] px-1.5 py-0.5 rounded border border-gray-200 dark:border-[#154c40]">
                    {item.patientCode}
                  </span>
                  <span
                    className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-full ${
                      isHigh
                        ? 'bg-rose-500 text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    {item.severity} Severity
                  </span>
                </div>

                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                  {item.reason}
                </p>

                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Trigger: <span className="italic">{item.triggerEvent}</span> • {item.flagDate}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onActionClick(item)}
                  className="w-full sm:w-auto px-3 py-1.5 bg-white dark:bg-[#0c2b24] hover:bg-teal-50 dark:hover:bg-[#124138] border border-gray-200 dark:border-[#19584b] text-[#0d9488] dark:text-[#2dd4bf] text-xs font-bold rounded-xl shadow-2xs transition cursor-pointer"
                >
                  Take Action &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

