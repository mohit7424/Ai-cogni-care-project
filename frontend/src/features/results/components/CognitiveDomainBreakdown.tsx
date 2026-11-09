'use client';

import React from 'react';
import type { DomainBreakdownItem } from '../types/results.types';

interface Props {
  domains: DomainBreakdownItem[];
  onDownloadPdf: () => void;
}

export default function CognitiveDomainBreakdown({
  domains,
  onDownloadPdf,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-7 shadow-xs space-y-5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">
            Cognitive Domain Breakdown
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Assessment breakdown from your most recent screening test
          </p>
        </div>

        {/* Download PDF button */}
        <button
          type="button"
          onClick={onDownloadPdf}
          className="flex items-center gap-1.5 py-2 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl border border-gray-200 transition shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Download Clinical Summary (PDF)</span>
        </button>
      </div>

      {/* 2x3 Grid of Domains matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {domains.map(d => (
          <div
            key={d.name}
            className="p-4 rounded-2xl bg-[#fbfdfc] border border-gray-100/90 space-y-2 hover:border-teal-200 transition"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-gray-800">{d.name}</h4>
              <span className="text-xs font-bold text-gray-700">
                {d.score} <span className="text-gray-400 font-normal">/ {d.maxScore}</span>
              </span>
            </div>

            {/* Teal Progress Bar */}
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0d9488] rounded-full transition-all duration-300"
                style={{ width: `${d.percentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] pt-0.5">
              <span className="text-gray-400">{d.subtext}</span>
              <span
                className={`font-semibold ${
                  d.tag === 'Optimal' ? 'text-emerald-600' : 'text-teal-700'
                }`}
              >
                {d.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

