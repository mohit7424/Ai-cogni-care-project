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
    <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-7 shadow-xs space-y-6">
      {/* Top Header Row with Baseline Date badge matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-100">
        <div>
          <h3 className="text-base font-bold text-gray-900 tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500 self-start sm:self-auto">
          <span>Baseline Scan:</span>
          <span className="font-bold text-gray-800 bg-gray-50 border border-gray-200/80 px-2.5 py-1 rounded-lg">
            {baselineDate}
          </span>
        </div>
      </div>

      {/* 3 Metric Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map(metric => (
          <div
            key={metric.id}
            className="p-5 rounded-2xl bg-[#f8fcfa] border border-teal-100/70 space-y-2 hover:border-teal-200 transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">
                {metric.label}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  metric.badgeType === 'emerald'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}
              >
                {metric.badge}
              </span>
            </div>

            <h4 className="text-2xl font-extrabold text-[#0a3832] tracking-tight">
              {metric.value}
            </h4>

            <p
              className={`text-xs ${
                metric.isPositiveChange
                  ? 'text-[#0d9488] font-semibold'
                  : 'text-gray-500'
              }`}
            >
              {metric.subtext}
            </p>
          </div>
        ))}
      </div>

      {/* Physician Clinical Remarks Banner matching screenshot */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#f0faf7] to-[#e6f7f3] border border-teal-100/90 flex items-start gap-3.5">
        <div className="w-6 h-6 rounded-lg bg-[#0d9488] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
          i
        </div>

        <div className="space-y-1">
          <h4 className="text-xs font-bold text-[#0a3832] uppercase tracking-wider">
            Physician Clinical Remarks
          </h4>
          <p className="text-xs text-gray-700 leading-relaxed italic">
            &ldquo;{physicianRemarks}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

