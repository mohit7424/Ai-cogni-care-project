import { authService } from '@/features/auth/services/authService';
import type { ResultsTrendsData } from '../types/results.types';
import { mockResultsData } from '../data/results.data';

export async function getResultsAndTrendsData(): Promise<ResultsTrendsData> {
  try {
    const res = await authService.get<ResultsTrendsData>('/results/trends');
    if (res.data && Object.keys(res.data).length > 0) {
      return res.data;
    }
    return mockResultsData;
  } catch {
    return mockResultsData;
  }
}

export async function downloadClinicalSummaryPdf(): Promise<{ url: string }> {
  try {
    const res = await authService.get<{ url: string }>('/results/clinical-summary-pdf');
    return res.data;
  } catch {
    return { url: '#' };
  }
}

