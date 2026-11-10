'use client';

import React from 'react';
import type { NeuroMetric } from '../types/mri.types';

interface Props {
  title: string;
  subtitle: string;
  baselineDate: string;
  metrics: NeuroMetric[];
  physicianRemarks: string;
}

export default function NeuroVolumetricCard({
  title,
  subtitle,
  baselineDate,
  metrics,
  physicianRemarks,
}: Props) {
  return (
    <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-5 sm:p-7 shadow-xs space-y-6 transition-colors duration-200">
      {/* Top Header Row with Baseline Date badge matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-100 dark:border-[#154c40]">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 self-start sm:self-auto">
          <span>Baseline Scan:</span>
          <span className="font-bold text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-[#071f1a] border border-gray-200/80 dark:border-[#154c40] px-2.5 py-1 rounded-lg">
            {baselineDate}
          </span>
        </div>
      </div>

      {/* 3 Metric Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map(metric => (
          <div
            key={metric.id}
            className="p-5 rounded-2xl bg-[#f8fcfa] dark:bg-[#071f1a] border border-teal-100/70 dark:border-[#154c40] space-y-2 hover:border-teal-200 dark:hover:border-teal-700 transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                {metric.label}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  metric.badgeType === 'emerald'
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {metric.badge}
              </span>
            </div>

            <h4 className="text-2xl font-extrabold text-[#0a3832] dark:text-teal-200 tracking-tight">
              {metric.value}
            </h4>

            <p
              className={`text-xs ${
                metric.isPositiveChange
                  ? 'text-[#0d9488] dark:text-[#2dd4bf] font-semibold'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {metric.subtext}
            </p>
          </div>
        ))}
      </div>

      {/* Physician Clinical Remarks Banner matching screenshot */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#f0faf7] to-[#e6f7f3] dark:from-[#0a2f28] dark:to-[#0f3d34] border border-teal-100/90 dark:border-[#154c40] flex items-start gap-3.5">
        <div className="w-6 h-6 rounded-lg bg-[#0d9488] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
          i
        </div>

        <div className="space-y-1">
          <h4 className="text-xs font-bold text-[#0a3832] dark:text-teal-200 uppercase tracking-wider">
            Physician Clinical Remarks
          </h4>
          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed italic">
            &ldquo;{physicianRemarks}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

