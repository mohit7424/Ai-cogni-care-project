'use client';

import React from 'react';

interface Props {
  onViewSession: (id: string) => void;
  onViewTrends: () => void;
}

export default function Sub9ScreeningHistory({ onViewSession, onViewTrends }: Props) {
  const sessions = [
    { id: '1', date: '05 Nov 2026', score: '78%', status: 'Normal', statusBg: 'bg-emerald-50 text-emerald-700' },
    { id: '2', date: '10 Aug 2026', score: '72%', status: 'Normal', statusBg: 'bg-emerald-50 text-emerald-700' },
    { id: '3', date: '15 May 2026', score: '68%', status: 'Watch', statusBg: 'bg-amber-50 text-amber-700' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-8 shadow-xs max-w-4xl mx-auto space-y-6">
      {/* Header with Timeframe Dropdown */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Screening History
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Your past screening sessions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onViewTrends}
            className="text-xs font-bold text-[#0d9488] bg-teal-50 px-3 py-1.5 rounded-lg hover:bg-teal-100 transition cursor-pointer"
          >
            View Trends Chart &rarr;
          </button>
          <div className="flex items-center gap-1 text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg cursor-pointer">
            <span>Last 6 Months</span>
            <span>▾</span>
          </div>
        </div>
      </div>

      {/* Table of Past Sessions matching screenshot */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Score</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sessions.map(s => (
              <tr key={s.id} className="hover:bg-gray-50/60 transition">
                <td className="py-3.5 px-4 font-semibold text-gray-800">{s.date}</td>
                <td className="py-3.5 px-4 font-bold text-teal-800">{s.score}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${s.statusBg}`}>
                    {s.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => onViewSession(s.id)}
                    className="py-1 px-3 bg-white border border-gray-200 hover:border-teal-300 text-gray-700 text-xs font-semibold rounded-lg shadow-2xs transition cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

