'use client';

import { useCaregiver } from '../hooks/useCaregiver';

interface Report {
  id: string;
  title: string;
  patientName: string;
  patientInitials: string;
  sharedBy?: string;
  date: string;
  type: 'PDF' | 'Document';
}

const mockReports: Report[] = [
  {
    id: 'r1',
    title: 'MMSE Progress Summary',
    patientName: 'Alex Parker',
    patientInitials: 'AP',
    sharedBy: 'Dr. Sarah Jenkins',
    date: '10 Nov 2026',
    type: 'PDF',
  },
  {
    id: 'r2',
    title: 'Cognitive Assessment Report',
    patientName: 'Eleanor Vance',
    patientInitials: 'EV',
    sharedBy: 'Dr. Sarah Jenkins',
    date: '04 Nov 2026',
    type: 'PDF',
  },
  {
    id: 'r3',
    title: 'Care Plan Update',
    patientName: 'Alex Parker',
    patientInitials: 'AP',
    sharedBy: 'Dr. Sarah Jenkins',
    date: '01 Nov 2026',
    type: 'Document',
  },
];

const typeBadge: Record<string, string> = {
  PDF: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  Document: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
};

const typeIcon: Record<string, string> = {
  PDF: '📄',
  Document: '📝',
};

export default function CaregiverReportsScreen() {
  useCaregiver();

  return (
    <div className="min-h-screen bg-[#ecf7f5] dark:bg-[#061815] p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-white dark:bg-[#0c2b24] p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">Care Reports</h1>
            <p className="text-sm text-gray-500 dark:text-teal-300 mt-1">
              Reports shared by your patients&apos; treating clinicians
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-[#154c40] flex items-center justify-center text-2xl flex-shrink-0">
            📋
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-3">
          <p className="text-xs text-amber-700 dark:text-amber-300">
            ⚠️ Reports are shared by the treating clinician. Medical interpretation requires a qualified professional.
          </p>
        </div>
      </div>

      {/* Reports Grid */}
      {mockReports.length === 0 ? (
        <div className="rounded-3xl bg-white dark:bg-[#0c2b24] p-10 text-center text-gray-400 dark:text-teal-400">
          <p className="text-4xl mb-3">📂</p>
          <p className="font-semibold">No reports shared yet</p>
          <p className="text-sm mt-1">Reports will appear here when shared by a clinician.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockReports.map((report) => (
            <div key={report.id} className="rounded-3xl bg-white dark:bg-[#0c2b24] p-5 shadow-sm flex flex-col gap-4">
              {/* Icon + type badge */}
              <div className="flex items-center justify-between">
                <span className="text-3xl">{typeIcon[report.type]}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${typeBadge[report.type]}`}>
                  {report.type}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-gray-800 dark:text-white leading-tight">{report.title}</h3>

              {/* Patient */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-[#154c40] flex items-center justify-center text-xs font-bold text-[#0d9488] flex-shrink-0">
                  {report.patientInitials}
                </div>
                <span className="text-sm text-gray-700 dark:text-teal-200 font-medium">{report.patientName}</span>
              </div>

              {/* Shared by + date */}
              <div className="text-xs text-gray-400 dark:text-teal-400 space-y-0.5">
                {report.sharedBy && <p>Shared by: <span className="text-gray-600 dark:text-teal-200 font-medium">{report.sharedBy}</span></p>}
                <p>Date: <span className="text-gray-600 dark:text-teal-200 font-medium">{report.date}</span></p>
              </div>

              {/* View button */}
              <button
                onClick={() => window.alert(`Opening report: ${report.title}`)}
                className="mt-auto w-full py-2 rounded-xl bg-[#0d9488] text-white text-sm font-semibold hover:bg-[#0f766e] transition-colors"
              >
                View Report
              </button>

              {/* Per-card disclaimer */}
              <p className="text-xs text-gray-400 dark:text-teal-500 border-t border-gray-100 dark:border-[#154c40] pt-2">
                Medical interpretation requires a qualified professional.
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

