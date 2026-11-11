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

      <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-5 shadow-xs overflow-x-auto">
        <table className="min-w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-100 dark:border-[#154c40] text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider">
              <th className="py-3 px-3">Report ID</th>
              <th className="py-3 px-3">Patient</th>
              <th className="py-3 px-3">Instrument / Scope</th>
              <th className="py-3 px-3">Generated Date</th>
              <th className="py-3 px-3">Author</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-[#154c40]">
            {sampleReports.map(rpt => (
              <tr key={rpt.id} className="hover:bg-teal-50/40 dark:hover:bg-[#071f1a] transition">
                <td className="py-3.5 px-3 font-mono font-bold text-gray-800 dark:text-white">
                  {rpt.id}
                </td>
                <td className="py-3.5 px-3">
                  <span className="font-extrabold text-gray-900 dark:text-white block">{rpt.patientName}</span>
                  <span className="font-mono text-[10px] text-gray-400">{rpt.patientCode}</span>
                </td>
                <td className="py-3.5 px-3 text-gray-700 dark:text-gray-300 font-medium">
                  {rpt.instrument}
                </td>
                <td className="py-3.5 px-3 text-gray-500">
                  {rpt.generatedDate}
                </td>
                <td className="py-3.5 px-3 text-gray-700 dark:text-gray-300">
                  {rpt.author}
                </td>
                <td className="py-3.5 px-3">
                  <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {rpt.status}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => alert(`Downloading signed PDF report for ${rpt.patientName}...`)}
                    className="px-3 py-1.5 rounded-xl border border-teal-200 dark:border-[#19584b] text-xs font-bold text-[#0d9488] hover:bg-teal-50 cursor-pointer"
                  >
                    Download PDF 📄
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

