'use client';

import React from 'react';
import type { PipelineStep } from '../types/mri.types';

interface Props {
  percentage: number;
  badgeLabel: string;
  headline: string;
  subheadline: string;
  pipelineSteps: PipelineStep[];
}

export default function AnalysisStatusCard({
  percentage,
  badgeLabel,
  headline,
  subheadline,
  pipelineSteps,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-5">
      {/* Header: Title + In Progress Badge */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
          Analysis Status
        </h3>

        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse inline-block" />
          <span>{badgeLabel}</span>
        </span>
      </div>

      {/* Radial 75% Dial & Status Headlines */}
      <div className="flex flex-col items-center text-center space-y-3 pt-2">
        {/* Radial Circular Progress Ring matching screenshot */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#e6f7f3"
              strokeWidth="9"
            />
            {/* 75% Progress Arc */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#0d9488"
              strokeWidth="9"
              strokeDasharray={2 * Math.PI * 40}
              strokeDashoffset={2 * Math.PI * 40 * (1 - percentage / 100)}
              strokeLinecap="round"
            />
          </svg>

          {/* Center 75% PROCESSING text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-[#0a3832]">
              {percentage}%
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
              PROCESSING
            </span>
          </div>
        </div>

        {/* Headlines */}
        <div className="space-y-0.5">
          <h4 className="text-sm sm:text-base font-bold text-gray-900">
            {headline}
          </h4>
          <p className="text-xs text-gray-500 max-w-xs">
            {subheadline}
          </p>
        </div>
      </div>

      {/* 3 Pipeline Steps Checklist matching screenshot */}
      <div className="space-y-2.5 pt-3 border-t border-gray-100 text-xs">
        {pipelineSteps.map(step => (
          <div key={step.id} className="flex items-center justify-between text-gray-700">
            <div className="flex items-center gap-2">
              {step.status === 'Completed' ? (
                <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-extrabold">
                  ✓
                </span>
              ) : step.status === 'Running' ? (
                <span className="w-4 h-4 rounded-full border-2 border-t-transparent border-[#0d9488] animate-spin inline-block" />
              ) : (
                <span className="w-4 h-4 rounded-full border border-gray-300 inline-block" />
              )}
              <span className="font-medium text-gray-800">{step.title}</span>
            </div>

            <span
              className={`text-[11px] font-bold ${
                step.status === 'Completed'
                  ? 'text-emerald-700'
                  : step.status === 'Running'
                  ? 'text-[#0d9488]'
                  : 'text-gray-400'
              }`}
            >
              {step.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

