'use client';

import React from 'react';
import { useMRI } from '../hooks/useMRI';
import {
  UploadMRIScanCard,
  AnalysisStatusCard,
  NeuroVolumetricCard,
  MRIHistoryModal,
} from '../components';

export default function MRIScreen() {
  const {
    data,
    isUploading,
    uploadSuccessMessage,
    isHistoryOpen,
    setIsHistoryOpen,
    handleFileUpload,
    handleSelectHistoryScan,
  } = useMRI();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Page Header matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a3832] tracking-tight">
            {data.pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {data.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsHistoryOpen(true)}
          className="text-xs font-bold text-[#0d9488] bg-white border border-teal-200/80 hover:bg-teal-50 px-4 py-2 rounded-xl shadow-2xs transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>View History</span>
          <span>&rarr;</span>
        </button>
      </div>

      {/* Main 2-Column Grid: Upload MRI Scan (Left) + Analysis Status (Right) matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Upload MRI Scan Card */}
        <div className="lg:col-span-7 flex flex-col">
          <UploadMRIScanCard
            dicomBadge={data.dicomBadge}
            supportedFormats={data.supportedFormats}
            complianceText={data.complianceText}
            maxSize={data.maxSize}
            isUploading={isUploading}
            uploadSuccessMessage={uploadSuccessMessage}
            onUploadFile={handleFileUpload}
          />
        </div>

        {/* Right: Analysis Status Card with 75% Dial & Steps */}
        <div className="lg:col-span-5 flex flex-col">
          <AnalysisStatusCard
            percentage={data.analysisStatus.percentage}
            badgeLabel={data.analysisStatus.badgeLabel}
            headline={data.analysisStatus.headline}
            subheadline={data.analysisStatus.subheadline}
            pipelineSteps={data.analysisStatus.pipelineSteps}
          />
        </div>
      </div>

      {/* Bottom Section: Prior MRI Comparison & Neuro-Volumetric Metrics Card */}
      <div>
        <NeuroVolumetricCard
          title={data.comparisonMetrics.title}
          subtitle={data.comparisonMetrics.subtitle}
          baselineDate={data.comparisonMetrics.baselineDate}
          metrics={data.comparisonMetrics.metrics}
          physicianRemarks={data.comparisonMetrics.physicianRemarks}
        />
      </div>

      {/* MRI History Modal */}
      <MRIHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        scans={data.historyScans}
        onSelectScan={handleSelectHistoryScan}
      />
    </div>
  );
}

