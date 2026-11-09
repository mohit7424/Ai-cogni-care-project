import { mockCTScanData } from '../data/ctScan.data';
import type { CTScanPageData, CTScanRecord } from '../types/ctScan.types';

export const ctScanService = {
  async getCTScanData(): Promise<CTScanPageData> {
    return Promise.resolve(mockCTScanData);
  },

  async uploadScan(file: File): Promise<CTScanRecord> {
    const newRecord: CTScanRecord = {
      id: `ct-${Date.now().toString().slice(-5)}`,
      uploadedDate: 'Just now',
      uploadedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Completed',
      scanType: 'Axial Brain Non-Contrast',
      slicesAnalyzed: '64 Slices (0.625mm)',
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    };
    return Promise.resolve(newRecord);
  },
};

