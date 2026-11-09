import { useState } from 'react';
import { mockMRIData } from '../data/mri.data';
import type { MRIAnalysisData, MRIScanRecord } from '../types/mri.types';

export function useMRI() {
  const [data, setData] = useState<MRIAnalysisData>(mockMRIData);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  function handleFileUpload(file: File) {
    setIsUploading(true);
    setUploadSuccessMessage(null);

    setTimeout(() => {
      const now = new Date();
      const newScan: MRIScanRecord = {
        id: `mri-${Date.now().toString().slice(-4)}`,
        date: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        scanType: '3D T1-Weighted Brain MRI',
        status: 'In Progress',
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024) || 78.4).toFixed(1)} MB`,
      };

      setData(prev => ({
        ...prev,
        historyScans: [newScan, ...prev.historyScans],
        analysisStatus: {
          ...prev.analysisStatus,
          percentage: 25,
          headline: 'Initiating AI Segmentation...',
          subheadline: `Analyzing neuroimaging slices for "${file.name}"`,
          pipelineSteps: [
            { id: 's-1', title: 'Slice Normalization & Alignment', status: 'Running' },
            { id: 's-2', title: 'Voxel-based Morphometry', status: 'Pending' },
            { id: 's-3', title: 'Hippocampal Boundary Detection', status: 'Pending' },
          ],
        },
      }));

      setIsUploading(false);
      setUploadSuccessMessage(`Successfully queued "${file.name}" for volumetric processing!`);
      setTimeout(() => setUploadSuccessMessage(null), 5000);
    }, 1200);
  }

  function handleSelectHistoryScan(scan: MRIScanRecord) {
    setIsHistoryOpen(false);
  }

  return {
    data,
    isUploading,
    uploadSuccessMessage,
    isHistoryOpen,
    setIsHistoryOpen,
    handleFileUpload,
    handleSelectHistoryScan,
  };
}

