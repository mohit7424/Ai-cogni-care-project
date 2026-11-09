'use client';

import React from 'react';
import type { ScreeningHistoryItem } from '../types/screening.types';

interface HistoryProps {
  history?: ScreeningHistoryItem[];
  clinicianName?: string;
  onViewAll?: () => void;
}

export default function ScreeningHistory({
  history = [
    {
      id: 'sc-1',
      month: 'OCT',
      day: '14',
      protocolName: 'MoCA Clinical Score',
      score: 26,
      totalScore: 30,
      status: 'Normal Range',
      summary: 'Visuospatial & Memory recall improved (+1 pt)',
      pdfUrl: '#',
    },
    {
      id: 'sc-2',
      month: 'AUG',
      day: '10',
      protocolName: 'MoCA Clinical Score',
      score: 25,
      totalScore: 30,
      status: 'Normal Range',
      summary: 'Baseline assessment confirmed stable',
      pdfUrl: '#',
    },
  ],
  clinicianName = 'Dr. Sarah Jenkins',
  onViewAll,
}: HistoryProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-gray-800">Recent Screenings History</h3>
            <p className="text-[10px] text-gray-400">
              Historical performance reviewed by {clinicianName}
            </p>
          </div>

          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-bold text-[#0d9488] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Full Analytics</span>
            <span>&rarr;</span>
          </button>
        </div>

        <div className="space-y-3">
          {history.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-2xl bg-gray-50/70 border border-gray-100 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                {/* Date Box */}
                <div className="w-11 h-11 rounded-xl bg-teal-50/90 border border-teal-100 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[9px] font-bold text-[#0d9488] uppercase">
                    {item.month}
                  </span>
                  <span className="text-sm font-extrabold text-gray-800 leading-none">
                    {item.day}
                  </span>
                </div>

                {/* Score & Summary */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-800">
                      {item.protocolName}: {item.score} / {item.totalScore}
                    </span>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">{item.summary}</p>
                </div>
              </div>

              {/* PDF Download Button */}
              <button
                type="button"
                onClick={() => alert(`Downloading ${item.protocolName} PDF Report...`)}
                className="flex items-center gap-1 text-[11px] font-bold text-gray-600 hover:text-teal-700 bg-white border border-gray-200 hover:border-teal-300 px-3 py-1.5 rounded-lg shadow-2xs transition cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>PDF</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

