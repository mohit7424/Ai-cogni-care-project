'use client';

import React from 'react';

interface Props {
  onViewSession?: (id: string) => void;
  onViewTrends?: () => void;
  onViewDetails?: () => void;
}

export default function Sub9ScreeningHistory({
  onViewSession,
  onViewTrends,
  onViewDetails,
}: Props) {
  const sessions = [
    { id: '1', date: '05 Nov 2026', score: '78%', status: 'Normal', statusBg: 'bg-emerald-50 text-emerald-700' },
    { id: '2', date: '10 Aug 2026', score: '72%', status: 'Normal', statusBg: 'bg-emerald-50 text-emerald-700' },
    { id: '3', date: '15 May 2026', score: '68%', status: 'Watch', statusBg: 'bg-amber-50 text-amber-700' },
  ];

  function handleAction(sessionId?: string) {
    if (sessionId && onViewSession) {
      onViewSession(sessionId);
    } else if (onViewTrends) {
      onViewTrends();
    } else if (onViewDetails) {
      onViewDetails();
    }
  }

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
            onClick={() => handleAction()}
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

      {/* Session History Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {sessions.map(s => (
          <div
            key={s.id}
            className="p-4 rounded-2xl border border-teal-100/80 bg-[#f8fcfa] hover:border-teal-300 hover:shadow-md transition-all flex flex-col gap-3 group"
          >
            {/* Score & Status */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Score</span>
                <span className="text-2xl font-black text-teal-800 leading-tight">{s.score}</span>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full mt-0.5 ${s.statusBg}`}>
                {s.status}
              </span>
            </div>

            {/* Date */}
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Date</span>
              <span className="text-xs font-semibold text-gray-800">{s.date}</span>
            </div>

            {/* Action */}
            <button
              type="button"
              onClick={() => handleAction(s.id)}
              className="w-full py-2 bg-white border border-gray-200 hover:border-teal-400 hover:bg-teal-50 text-gray-700 hover:text-[#0d9488] text-xs font-bold rounded-xl shadow-2xs transition cursor-pointer"
            >
              View Session →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
