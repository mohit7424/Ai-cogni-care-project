import { mockMRIData } from '../data/mri.data';
import type { MRIAnalysisData, MRIScanRecord } from '../types/mri.types';

export const mriService = {
  async getMRIData(): Promise<MRIAnalysisData> {
    return Promise.resolve(mockMRIData);
  },

  async uploadMRIScan(file: File): Promise<MRIScanRecord> {
    const newScan: MRIScanRecord = {
      id: `mri-${Date.now().toString().slice(-4)}`,
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      scanType: 'High-Resolution 3D T1 MRI',
      status: 'In Progress',
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    };
    return Promise.resolve(newScan);
  },
};

