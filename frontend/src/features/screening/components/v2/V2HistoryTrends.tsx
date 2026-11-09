'use client';

import React from 'react';

interface Props {
  onRetake: () => void;
}

export default function V2HistoryTrends({ onRetake }: Props) {
  const sessions = [
    { date: '05 Nov 2026', score: '86%', status: 'Good', statusBg: 'bg-emerald-50 text-emerald-700' },
    { date: '10 Aug 2026', score: '78%', status: 'Good', statusBg: 'bg-emerald-50 text-emerald-700' },
    { date: '12 Jun 2026', score: '72%', status: 'Fair', statusBg: 'bg-amber-50 text-amber-700' },
  ];

  const trendPoints = [
    { month: 'Jun', score: 72 },
    { month: 'Aug', score: 78 },
    { month: 'Nov', score: 86 },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header matching screenshot 6 */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center font-bold text-base">
            🧠
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Screening History & Trends
            </h2>
            <p className="text-xs text-gray-500">Track your progress over time</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-2xs cursor-pointer">
          <span>Last 6 Months</span>
          <span>▾</span>
        </div>
      </div>

      {/* 2-Column Grid: Left Previous Sessions Table & Right Progress Trend Chart matching screenshot 6 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Previous Sessions Table */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-teal-100/80 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">
              Previous Sessions
            </h3>

            <div className="space-y-2.5">
              {sessions.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f8fcfa] border border-teal-50 hover:bg-teal-50/40 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">📅</span>
                    <span className="text-xs font-bold text-gray-800">{s.date}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-extrabold text-teal-800">{s.score}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.statusBg}`}>
                      {s.status}
                    </span>
                    <span className="text-gray-400 text-xs">&gt;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onRetake}
              className="w-full py-2.5 text-xs font-bold text-[#0d9488] bg-teal-50 hover:bg-teal-100 rounded-xl transition cursor-pointer"
            >
              Start New Screening &rarr;
            </button>
          </div>
        </div>

        {/* Right: Your Progress Trend Line Chart matching screenshot 6 */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-teal-100/80 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                Your Progress Trend
              </h3>
              <span className="text-xs font-extrabold text-white bg-[#0d9488] px-2.5 py-0.5 rounded-full shadow-2xs">
                86%
              </span>
            </div>

            {/* Line Trend Visualization */}
            <div className="relative h-44 flex flex-col justify-between pt-2 pb-4">
              {/* Y Axis gridlines */}
              <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-gray-400 pointer-events-none">
                <div className="border-b border-gray-100 flex items-center justify-between">
                  <span>100%</span>
                </div>
                <div className="border-b border-gray-100 flex items-center justify-between">
                  <span>75%</span>
                </div>
                <div className="border-b border-gray-100 flex items-center justify-between">
                  <span>50%</span>
                </div>
              </div>

              {/* Data points */}
              <div className="relative h-full flex items-end justify-around px-8 z-10">
                {trendPoints.map(p => (
                  <div key={p.month} className="flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[11px] font-bold text-[#0d9488] bg-teal-50 px-2 py-0.5 rounded-md">
                      {p.score}%
                    </span>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#0d9488] ring-4 ring-teal-100 shadow-xs" />
                    <span className="text-[11px] font-semibold text-gray-500 mt-1">{p.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Motivation Tip matching screenshot 6 */}
          <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-[11px] text-emerald-900 font-medium flex items-center gap-2">
            <span>💡</span>
            <span>Great progress! Keep up the regular screenings for better cognitive health.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

