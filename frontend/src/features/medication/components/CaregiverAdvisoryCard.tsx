'use client';

import React from 'react';
import type { CaregiverAdvisoryCardItem } from '../types/medication.types';

interface Props {
  headerTitle: string;
  attribution: string;
  advisories: CaregiverAdvisoryCardItem[];
}

export default function CaregiverAdvisoryCard({
  headerTitle,
  attribution,
  advisories,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header with (i) Icon and Doctor Attribution */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <span className="w-5 h-5 rounded-full bg-teal-50 text-[#0d9488] flex items-center justify-center text-xs font-bold shrink-0">
            i
          </span>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
            {headerTitle}
          </h2>
        </div>

        <p className="text-xs text-gray-500 font-medium">
          {attribution}
        </p>
      </div>

      {/* 3-Column Advisory Cards Grid matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {advisories.map(adv => (
          <div
            key={adv.id}
            className="p-5 rounded-2xl bg-[#f8fcfa] border border-teal-100/70 space-y-2 hover:border-teal-200 transition"
          >
            <h3 className="text-xs sm:text-sm font-bold text-gray-900">
              {adv.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {adv.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

