'use client';

import React from 'react';
import { useCTScan } from '../hooks/useCTScan';
import {
  UploadCTScanCard,
  ScanStatusCard,
  DiagnosticSummaryCard,
  ReportModal,
  ScanHistoryModal,
} from '../components';

export default function CTScanScreen() {
  const {
    data,
    currentScan,
    isUploading,
    uploadSuccessMessage,
    isReportOpen,
    setIsReportOpen,
    isHistoryOpen,
    setIsHistoryOpen,
    handleFileUpload,
    handleSelectHistoryScan,
  } = useCTScan();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Page Header matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a3832] dark:text-white tracking-tight">
            {data.pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-0.5">
            {data.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsHistoryOpen(true)}
          className="text-xs font-bold text-[#0d9488] dark:text-[#2dd4bf] bg-white dark:bg-[#0c2b24] border border-teal-200/80 dark:border-[#154c40] hover:bg-teal-50 dark:hover:bg-[#124138] px-4 py-2 rounded-xl shadow-2xs transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>Scan History</span>
          <span>&rarr;</span>
        </button>
      </div>

      {/* Main 2-Column Grid: Upload CT Scan (Left) + Scan Status (Right) matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Upload CT Scan Card */}
        <div className="lg:col-span-7 flex flex-col">
          <UploadCTScanCard
            supportedFormats={data.supportedFormats}
            maxFileSize={data.maxFileSize}
            complianceText={data.complianceText}
            isUploading={isUploading}
            uploadSuccessMessage={uploadSuccessMessage}
            onUploadFile={handleFileUpload}
          />
        </div>

        {/* Right: Scan Status Card */}
        <div className="lg:col-span-5 flex flex-col">
          <ScanStatusCard
            scan={currentScan}
            onViewReport={() => setIsReportOpen(true)}
          />
        </div>
      </div>

      {/* Bottom Row: Diagnostic Summary & Clinical Notes Card matching screenshot */}
      <div>
        <DiagnosticSummaryCard summary={data.diagnosticSummary} />
      </div>

      {/* Full Diagnostic Radiology Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        scan={currentScan}
        summary={data.diagnosticSummary}
      />

      {/* Past CT Scan History Modal */}
      <ScanHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={data.scanHistory}
        activeScanId={currentScan.id}
        onSelectScan={handleSelectHistoryScan}
      />
    </div>
  );
}

