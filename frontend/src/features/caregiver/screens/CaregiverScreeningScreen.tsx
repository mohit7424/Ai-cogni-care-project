'use client';

import { useState } from 'react';
import { useCaregiver } from '../hooks/useCaregiver';

interface ScreeningRecord {
  id: string;
  patientName: string;
  initials: string;
  score: number;
  total: number;
  instrument: string;
  date: string;
  status: 'Completed' | 'Reviewed' | 'Pending';
  clinicalRange: string;
}

const mockScreeningRecords: ScreeningRecord[] = [
  {
    id: 's1',
    patientName: 'Alex Parker',
    initials: 'AP',
    score: 26,
    total: 30,
    instrument: 'MMSE',
    date: '10 Nov 2026',
    status: 'Completed',
    clinicalRange: 'Normal',
  },
  {
    id: 's2',
    patientName: 'Eleanor Vance',
    initials: 'EV',
    score: 22,
    total: 30,
    instrument: 'MMSE',
    date: '04 Nov 2026',
    status: 'Reviewed',
    clinicalRange: 'Mild Cognitive Impairment',
  },
  {
    id: 's3',
    patientName: 'Eleanor Vance',
    initials: 'EV',
    score: 24,
    total: 30,
    instrument: 'MMSE',
    date: '15 Oct 2026',
    status: 'Completed',
    clinicalRange: 'Normal',
  },
];

const patientFilters = ['All', 'Alex Parker', 'Eleanor Vance'];

const statusColors: Record<string, string> = {
  Completed: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Reviewed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
};

const scoreColor = (score: number, total: number) => {
  const pct = score / total;
  if (pct >= 0.9) return 'text-green-600 dark:text-green-400';
  if (pct >= 0.73) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
};

export default function CaregiverScreeningScreen() {
  useCaregiver();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? mockScreeningRecords
      : mockScreeningRecords.filter((r) => r.patientName === activeFilter);

  return (
    <div className="min-h-screen bg-[#ecf7f5] dark:bg-[#061815] p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-white dark:bg-[#0c2b24] p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">Screening &amp; Results</h1>
            <p className="text-sm text-gray-500 dark:text-teal-300 mt-1">
              Cognitive screening history for your linked patients
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-[#154c40] flex items-center justify-center text-2xl flex-shrink-0">
            🧠
          </div>
        </div>
        <div className="mt-3 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-3">
          <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">
            ⚠️ Scores are informational — not a diagnosis. For clinical interpretation, consult the treating physician.
          </p>
        </div>
      </div>

      {/* Patient Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {patientFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeFilter === filter
                ? 'bg-[#0d9488] text-white shadow-md'
                : 'bg-white dark:bg-[#0c2b24] text-gray-600 dark:text-teal-200 hover:bg-teal-50 dark:hover:bg-[#154c40]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl bg-white dark:bg-[#0c2b24] p-10 text-center text-gray-400 dark:text-teal-400">
          <p className="text-4xl mb-3">📋</p>
          <p className="font-semibold">No screening records found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((record) => (
            <div key={record.id} className="rounded-3xl bg-white dark:bg-[#0c2b24] p-5 shadow-sm flex flex-col gap-4">
              {/* Patient avatar + name */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-teal-100 dark:bg-[#154c40] flex items-center justify-center font-extrabold text-[#0d9488] flex-shrink-0">
                  {record.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{record.patientName}</p>
                  <p className="text-xs text-gray-400 dark:text-teal-400">{record.date}</p>
                </div>
              </div>

              {/* Score */}
              <div className="text-center rounded-2xl bg-[#ecf7f5] dark:bg-[#154c40] p-4">
                <p className={`text-5xl font-extrabold ${scoreColor(record.score, record.total)}`}>
                  {record.score}
                </p>
                <p className="text-sm text-gray-500 dark:text-teal-300">/ {record.total}</p>
                <p className="text-xs font-semibold text-gray-600 dark:text-teal-200 mt-1">{record.instrument}</p>
              </div>

              {/* Clinical range */}
              <div className="text-center">
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${scoreColor(record.score, record.total)} bg-opacity-10`}>
                  {record.clinicalRange}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusColors[record.status]}`}>
                  {record.status}
                </span>
              </div>

              {/* Non-diagnostic note */}
              <p className="text-xs text-gray-400 dark:text-teal-500 border-t border-gray-100 dark:border-[#154c40] pt-3">
                For clinical interpretation, consult the treating physician.
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

