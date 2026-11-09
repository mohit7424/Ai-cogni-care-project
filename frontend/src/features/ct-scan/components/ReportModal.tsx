'use client';

import React from 'react';
import type { CTScanRecord, DiagnosticSummary } from '../types/ctScan.types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  scan: CTScanRecord;
  summary: DiagnosticSummary;
}

export default function ReportModal({ isOpen, onClose, scan, summary }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-teal-100 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center font-bold text-sm">
              📋
            </span>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Official Radiology CT Report
              </h3>
              <p className="text-xs text-gray-400">
                Record #{scan.id.toUpperCase()} • Patient: Alex Parker
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl font-bold cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Scan Details Header */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#f8fcfa] border border-teal-100/70 text-xs">
          <div>
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Date</span>
            <span className="font-bold text-gray-800">{scan.uploadedDate}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Time</span>
            <span className="font-bold text-gray-800">{scan.uploadedTime}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Type</span>
            <span className="font-bold text-gray-800">{scan.scanType}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Analyzed Slices</span>
            <span className="font-bold text-gray-800">{scan.slicesAnalyzed}</span>
          </div>
        </div>

        {/* Findings Summary */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
            Clinical Volumetric Findings
          </h4>
          <div className="space-y-2">
            {summary.metrics.map(m => (
              <div
                key={m.id}
                className="p-3 rounded-xl border border-gray-100 bg-gray-50/60 flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-gray-800">{m.label}</p>
                  <p className="text-[11px] text-gray-500">{m.subtext}</p>
                </div>
                <span className="text-xs font-extrabold text-[#0d9488] bg-teal-50 px-2.5 py-1 rounded-md">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Radiologist Note & Attestation */}
        <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#0a3832]">Attending Radiologist Note</span>
            <span className="text-[11px] text-teal-700 font-semibold">Verified & Digitally Signed</span>
          </div>
          <p className="text-gray-600 leading-relaxed text-[11.5px]">
            Ventricular system and basal cisterns remain within normal limits. Symmetrical cerebral hemispheres with no acute intracranial hemorrhage, mass effect, or midline shift detected. Longitudinal comparison with baseline remains stable.
          </p>
          <p className="text-right text-[11px] font-bold text-gray-800 pt-1">
            — {summary.radiologistName}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="py-2.5 px-5 rounded-xl bg-[#0d9488] hover:bg-[#0b8075] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <span>🖨️</span>
            <span>Print Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}

