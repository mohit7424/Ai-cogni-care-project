import { useState } from 'react';
import { mockCTScanData } from '../data/ctScan.data';
import type { CTScanPageData, CTScanRecord } from '../types/ctScan.types';

export function useCTScan() {
  const [data, setData] = useState<CTScanPageData>(mockCTScanData);
  const [currentScan, setCurrentScan] = useState<CTScanRecord>(mockCTScanData.currentScan);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  async function handleFileUpload(file: File) {
    setIsUploading(true);
    setUploadSuccessMessage(null);

    // Simulate upload delay
    setTimeout(() => {
      const now = new Date();
      const newScan: CTScanRecord = {
        id: `ct-${Date.now().toString().slice(-5)}`,
        uploadedDate: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        uploadedTime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Completed',
        scanType: 'Axial Brain Non-Contrast',
        slicesAnalyzed: '64 Slices (0.625mm)',
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024) || 24.5).toFixed(1)} MB`,
      };

      setCurrentScan(newScan);
      setData(prev => ({
        ...prev,
        currentScan: newScan,
        scanHistory: [newScan, ...prev.scanHistory],
      }));
      setIsUploading(false);
      setUploadSuccessMessage(`Successfully uploaded "${file.name}"!`);
      setTimeout(() => setUploadSuccessMessage(null), 5000);
    }, 1200);
  }

  function handleSelectHistoryScan(scan: CTScanRecord) {
    setCurrentScan(scan);
    setIsHistoryOpen(false);
  }

  return {
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
  };
}

