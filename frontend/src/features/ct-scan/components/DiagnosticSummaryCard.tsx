'use client';

import React from 'react';
import type { DiagnosticSummary } from '../types/ctScan.types';

interface Props {
  summary: DiagnosticSummary;
}

export default function DiagnosticSummaryCard({ summary }: Props) {
  return (
    <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-5 sm:p-7 shadow-xs space-y-6 transition-colors duration-200">
      {/* Top Header with Verified Doctor Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-100 dark:border-[#154c40]">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
            {summary.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {summary.subtitle}
          </p>
        </div>

        {summary.radiologistVerified && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0d9488] dark:text-[#2dd4bf] bg-[#e6f7f3] dark:bg-[#071f1a] border border-teal-100 dark:border-[#154c40] px-3.5 py-1 rounded-full self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#0d9488] dark:bg-[#2dd4bf] inline-block" />
            <span>Radiologist Verified | {summary.radiologistName}</span>
          </span>
        )}
      </div>

      {/* 3 Metrics Cards Grid matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summary.metrics.map(metric => (
          <div
            key={metric.id}
            className="p-5 rounded-2xl bg-[#f8fcfa] dark:bg-[#071f1a] border border-teal-100/70 dark:border-[#154c40] space-y-1.5 hover:border-teal-200 dark:hover:border-teal-700 transition"
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400">
              {metric.label}
            </p>
            <h4 className="text-base font-extrabold text-gray-900 dark:text-white">
              {metric.value}
            </h4>
            <p
              className={`text-xs ${
                metric.statusColor === 'emerald'
                  ? 'text-[#0d9488] dark:text-[#2dd4bf] font-semibold'
                  : 'text-gray-500 dark:text-gray-400'
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

