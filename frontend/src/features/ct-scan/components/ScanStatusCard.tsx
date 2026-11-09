'use client';

import React from 'react';
import type { CTScanRecord } from '../types/ctScan.types';

interface Props {
  scan: CTScanRecord;
  onViewReport: () => void;
}

export default function ScanStatusCard({ scan, onViewReport }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
      {/* Header: Title & Status Badge */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">
          Scan Status
        </h3>

        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0d9488] bg-[#e6f7f3] border border-teal-100 px-3 py-1 rounded-full">
          <span>✓</span>
          <span>Scan Completed</span>
        </span>
      </div>

      {/* Middle Box: Uploaded Date/Time + CT Scan Thumbnail Image */}
      <div className="p-4 rounded-2xl bg-[#f8fcfa] border border-teal-100/70 flex items-center justify-between gap-4">
        {/* Upload Date & Time */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            UPLOADED ON
          </p>
          <h4 className="text-sm sm:text-base font-extrabold text-gray-900">
            {scan.uploadedDate}
          </h4>
          <p className="text-xs text-gray-500 font-medium">
            {scan.uploadedTime}
          </p>
        </div>

        {/* CT Scan Slice Graphic Thumbnail matching screenshot */}
        <div className="relative w-24 h-20 rounded-xl bg-black overflow-hidden border border-gray-800 shadow-md flex items-center justify-center shrink-0">
          <svg className="w-full h-full" viewBox="0 0 100 80" fill="none">
            {/* Dark background */}
            <rect width="100" height="80" fill="#090d10" />

            {/* Skull bone ring (high density CT white) */}
            <ellipse cx="50" cy="40" rx="34" ry="28" stroke="#f1f5f9" strokeWidth="2.5" fill="#1e293b" opacity="0.9" />

            {/* Inner brain matter lobes */}
            <path
              d="M 50 16 C 36 16 26 26 26 40 C 26 53 36 63 50 63 C 64 63 74 53 74 40 C 74 26 64 16 50 16 Z"
              fill="#334155"
              opacity="0.8"
            />

            {/* Hemispheric midline */}
            <line x1="50" y1="18" x2="50" y2="62" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />

            {/* Ventricles (hypodense CSF spaces) */}
            <ellipse cx="44" cy="38" rx="4" ry="9" fill="#090d10" />
            <ellipse cx="56" cy="38" rx="4" ry="9" fill="#090d10" />

            {/* Sulci and gyri texture marks */}
            <path d="M 32 30 Q 38 34 34 44" stroke="#94a3b8" strokeWidth="0.8" fill="none" opacity="0.6" />
            <path d="M 68 30 Q 62 34 66 44" stroke="#94a3b8" strokeWidth="0.8" fill="none" opacity="0.6" />
            <path d="M 38 52 Q 44 48 42 56" stroke="#94a3b8" strokeWidth="0.8" fill="none" opacity="0.6" />
            <path d="M 62 52 Q 56 48 58 56" stroke="#94a3b8" strokeWidth="0.8" fill="none" opacity="0.6" />

            {/* Scan slice label bottom */}
            <rect x="25" y="66" width="50" height="10" rx="2" fill="#0f172a" opacity="0.85" />
            <text x="50" y="73" fill="#2dd4bf" fontSize="6" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              CT #84920
            </text>
          </svg>
        </div>
      </div>

      {/* Metadata Rows: Scan Type & Slices Analyzed matching screenshot */}
      <div className="space-y-2.5 text-xs">
        <div className="flex items-center justify-between text-gray-500">
          <span>Scan Type:</span>
          <span className="font-bold text-gray-800">{scan.scanType}</span>
        </div>

        <div className="flex items-center justify-between text-gray-500">
          <span>Slices Analyzed:</span>
          <span className="font-bold text-gray-800">{scan.slicesAnalyzed}</span>
        </div>
      </div>

      {/* View Report Button */}
      <div>
        <button
          type="button"
          onClick={onViewReport}
          className="w-full py-2.5 px-4 bg-[#0a3832] hover:bg-[#082e29] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>View Report</span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}

