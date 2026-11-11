'use client';

import React from 'react';
import type { CohortDistributionItem } from '../types/doctor.types';

interface Props {
  cohort: CohortDistributionItem[];
  totalPatients: number;
}

export default function CognitiveCohortChartCard({
  cohort,
  totalPatients,
}: Props) {
  return (
    <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-[#154c40]">
        <div>
          <h2 className="text-base font-extrabold text-gray-900 dark:text-white tracking-tight">
            Assigned Patient Cohort Breakdown
          </h2>
          <p className="text-[11px] text-gray-400">
            Cognitive screening status distribution ({totalPatients} active patients)
          </p>
        </div>
        <span className="text-xs font-bold text-[#0d9488] bg-teal-50 dark:bg-[#0e3a31] px-2.5 py-1 rounded-full">
          Total: {totalPatients}
        </span>
      </div>

      {/* Stacked Progress Bar */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-100 dark:bg-[#071f1a] rounded-full overflow-hidden flex">
          {cohort.map(c => (
            <div
              key={c.category}
              style={{ width: `${c.percentage}%`, backgroundColor: c.color }}
              className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
              title={`${c.category}: ${c.count} (${c.percentage}%)`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {cohort.map(c => (
            <div
              key={c.category}
              className="p-3 rounded-2xl bg-[#f8fcfa] dark:bg-[#071f1a] border border-gray-100 dark:border-[#154c40] space-y-1"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 truncate">
                  {c.category}
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-xl font-extrabold text-[#0a3832] dark:text-white">
                  {c.count}
                </span>
                <span className="text-xs font-bold text-gray-400">
                  {c.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Governance Disclaimer Banner mandated by PRD */}
      <div className="p-3 rounded-2xl bg-teal-50/70 dark:bg-[#0e352d]/60 border border-teal-100 dark:border-[#154c40] flex items-start gap-2.5 text-[11px] text-gray-600 dark:text-gray-300">
        <span className="w-4 h-4 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
          i
        </span>
        <p className="leading-relaxed">
          <strong>Clinical Advisory:</strong> Cognitive screening indicators provide decision support and must be evaluated in context with full clinical history, neuroimaging, and laboratory evaluation.
        </p>
      </div>
    </div>
  );
}

