'use client';

import React from 'react';
import type { CTScanRecord } from '../types/ctScan.types';

interface Props {
  scan: CTScanRecord;
  onViewReport: () => void;
}

export default function ScanStatusCard({ scan, onViewReport }: Props) {
  return (
    <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-5 sm:p-7 shadow-xs flex flex-col justify-between space-y-6 transition-colors duration-200">
      {/* Header: Title and Completed Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
            Scan Status
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Axial 64-Slice Neuro-Volumetric Analysis
          </p>
        </div>

        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0d9488] dark:text-[#2dd4bf] bg-[#e6f7f3] dark:bg-[#124138] border border-teal-100 dark:border-[#155c4e] px-3 py-1 rounded-full self-start sm:self-auto shrink-0">
          <span>✓</span>
          <span>Scan Completed</span>
        </span>
      </div>

      {/* Middle Box: Uploaded Date/Time + CT Scan Thumbnail Image */}
      <div className="p-4 rounded-2xl bg-[#f8fcfa] dark:bg-[#071f1a] border border-teal-100/70 dark:border-[#154c40] flex items-center justify-between gap-4">
        {/* Upload Date & Time */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400">
            UPLOADED ON
          </p>
          <h4 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white">
            {scan.uploadedDate}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-300 font-medium">
            {scan.uploadedTime}
          </p>
        </div>

        {/* CT Scan Slice Graphic Thumbnail matching screenshot */}
        <div className="relative w-24 h-20 rounded-xl bg-black overflow-hidden border border-gray-800 shadow-md flex items-center justify-center shrink-0">
          <svg className="w-full h-full" viewBox="0 0 100 80" fill="none">
            <rect width="100" height="80" fill="#090d10" />
            <ellipse cx="50" cy="40" rx="34" ry="28" stroke="#f1f5f9" strokeWidth="2.5" fill="#1e293b" opacity="0.9" />
            <path
              d="M 50 16 C 36 16 26 26 26 40 C 26 53 36 63 50 63 C 64 63 74 53 74 40 C 74 26 64 16 50 16 Z"
              fill="#334155"
              opacity="0.8"
            />
            <line x1="50" y1="18" x2="50" y2="62" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
            <path d="M 44 32 C 44 28 47 26 48 36 C 48 42 45 46 44 44 Z" fill="#020617" />
            <path d="M 56 32 C 56 28 53 26 52 36 C 52 42 55 46 56 44 Z" fill="#020617" />
          </svg>
          <span className="absolute bottom-1 right-1.5 text-[8.5px] font-mono text-teal-400 bg-black/70 px-1 rounded">
            SLICE 32
          </span>
        </div>
      </div>

      {/* Action: View Report Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onViewReport}
          className="w-full py-3 px-4 rounded-xl bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] text-white text-xs font-bold shadow-md shadow-teal-900/10 transition flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation"
        >
          <span>View Diagnostic Report</span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}
