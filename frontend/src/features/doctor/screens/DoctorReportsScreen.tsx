'use client';

import React from 'react';
import { useDoctor } from '../hooks/useDoctor';

export default function DoctorReportsScreen() {
  const { data } = useDoctor();

  if (!data) return null;

  const sampleReports = [
    {
      id: 'rpt-01',
      patientName: 'Alex Parker',
      patientCode: 'CC-00258',
      instrument: 'MMSE Longitudinal Progress Summary',
      generatedDate: '10 Nov 2026',
      author: 'Dr. Sarah Jenkins',
      status: 'Signed & Certified',
      downloadUrl: '#',
    },
    {
      id: 'rpt-02',
      patientName: 'Eleanor Vance',
      patientCode: 'CC-00142',
      instrument: 'MoCA Baseline & Volumetric Correlation',
      generatedDate: '04 Nov 2026',
      author: 'Dr. Sarah Jenkins',
      status: 'Signed & Certified',
      downloadUrl: '#',
    },
    {
      id: 'rpt-03',
      patientName: 'Meera Rao',
      patientCode: 'CC-00204',
      instrument: 'Comprehensive Neurological Evaluation Report',
      generatedDate: '28 Oct 2026',
      author: 'Dr. Sarah Jenkins',
      status: 'Archived',
      downloadUrl: '#',
    },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a3832] dark:text-white tracking-tight">
            Clinical Diagnostic Reports
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Compiled clinical summaries, PDF generation, and verified neurological exports
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Generating new clinical summary compilation...')}
          className="px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8075] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
        >
          Generate New Report
        </button>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sampleReports.map(rpt => (
          <div
            key={rpt.id}
            className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-5 shadow-xs hover:shadow-md hover:border-teal-300 dark:hover:border-teal-500/50 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              {/* Header: Report ID + Status */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-xl bg-gray-100 dark:bg-[#071f1a] text-gray-700 dark:text-gray-300">
                  {rpt.id.toUpperCase()}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  rpt.status.includes('Signed')
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300'
                    : 'bg-gray-100 text-gray-600 dark:bg-[#071f1a] dark:text-gray-400'
                }`}>
                  {rpt.status}
                </span>
              </div>

              {/* Patient Info */}
              <div>
                <h3 className="font-extrabold text-gray-900 dark:text-white text-base leading-tight group-hover:text-[#0d9488] transition-colors">
                  {rpt.patientName}
                </h3>
                <span className="font-mono text-[11px] text-gray-400">{rpt.patientCode}</span>
              </div>

              {/* Instrument / Scope box */}
              <div className="p-3 rounded-2xl bg-teal-50/60 dark:bg-[#071f1a] border border-teal-100/60 dark:border-[#154c40]">
                <span className="text-[10px] uppercase font-bold text-teal-700/60 dark:text-teal-400/60 tracking-wider block mb-0.5">
                  Instrument / Scope
                </span>
                <p className="text-xs font-bold text-gray-800 dark:text-teal-100 leading-snug">
                  {rpt.instrument}
                </p>
              </div>

              {/* Meta: date + author */}
              <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 px-0.5">
                <span>📅 {rpt.generatedDate}</span>
                <span>✍️ {rpt.author}</span>
              </div>
            </div>

            {/* Download button */}
            <button
              type="button"
              onClick={() => alert(`Downloading signed PDF report for ${rpt.patientName}...`)}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-teal-50 hover:bg-[#0d9488] text-[#0d9488] hover:text-white border border-teal-200/80 dark:border-[#19584b] text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>Download PDF Report</span>
              <span>📄</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

