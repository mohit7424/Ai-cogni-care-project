'use client';

import React from 'react';
import type { DiagnosticSummary } from '../types/ctScan.types';

interface Props {
  summary: DiagnosticSummary;
}

export default function DiagnosticSummaryCard({ summary }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-7 shadow-xs space-y-6">
      {/* Top Header with Verified Doctor Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-100">
        <div>
          <h3 className="text-base font-bold text-gray-900 tracking-tight">
            {summary.title}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {summary.subtitle}
          </p>
        </div>

        {summary.radiologistVerified && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0d9488] bg-[#e6f7f3] border border-teal-100 px-3.5 py-1 rounded-full self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#0d9488] inline-block" />
            <span>Radiologist Verified | {summary.radiologistName}</span>
          </span>
        )}
      </div>

      {/* 3 Metrics Cards Grid matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summary.metrics.map(metric => (
          <div
            key={metric.id}
            className="p-5 rounded-2xl bg-[#f8fcfa] border border-teal-100/70 space-y-1.5 hover:border-teal-200 transition"
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              {metric.label}
            </p>
            <h4 className="text-base font-extrabold text-gray-900">
              {metric.value}
            </h4>
            <p
              className={`text-xs ${
                metric.statusColor === 'emerald'
                  ? 'text-[#0d9488] font-semibold'
                  : 'text-gray-500'
              }`}
            >
              {metric.subtext}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

