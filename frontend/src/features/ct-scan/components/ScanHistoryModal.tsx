'use client';

import React from 'react';
import type { CTScanRecord } from '../types/ctScan.types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  history: CTScanRecord[];
  activeScanId: string;
  onSelectScan: (scan: CTScanRecord) => void;
}

export default function ScanHistoryModal({
  isOpen,
  onClose,
  history,
  activeScanId,
  onSelectScan,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-teal-100 space-y-5 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-bold text-gray-900">CT Scan History</h3>
            <p className="text-xs text-gray-400">
              Select any past radiological scan session to inspect findings
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl font-bold cursor-pointer"
          >
            &times;
          </button>
        </div>

        <div className="space-y-3">
          {history.map(scan => {
            const isCurrent = scan.id === activeScanId;
            return (
              <div
                key={scan.id}
                className={`p-4 rounded-2xl border transition flex items-center justify-between gap-4 ${
                  isCurrent
                    ? 'border-[#0d9488] bg-teal-50/50 shadow-xs'
                    : 'border-gray-100 bg-[#fbfdfc] hover:border-teal-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900">
                      {scan.uploadedDate}
                    </span>
                    <span className="text-[10px] text-gray-400">at {scan.uploadedTime}</span>
                    {isCurrent && (
                      <span className="text-[9.5px] font-bold text-[#0d9488] bg-teal-100 px-2 py-0.5 rounded-full">
                        Active View
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 font-medium">{scan.scanType}</p>
                  <p className="text-[10.5px] text-gray-400">{scan.slicesAnalyzed}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectScan(scan)}
                  className={`py-1.5 px-3.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isCurrent
                      ? 'bg-[#0d9488] text-white shadow-xs'
                      : 'border border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {isCurrent ? 'Loaded' : 'Select'}
                </button>
              </div>
            );
          })}
        </div>

        <div className="pt-2 text-right">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

