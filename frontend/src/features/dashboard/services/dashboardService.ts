import { authService } from '@/features/auth/services/authService';
import type { DashboardData } from '../types/dashboard.types';
import { mockDashboardData } from '../data/dashboard.data';

export async function getDashboardData(): Promise<DashboardData> {
  try {
    const res = await authService.get<DashboardData>('/dashboard');
    if (res.data && Object.keys(res.data).length > 0) {
      return res.data;
    }
    return mockDashboardData;
  } catch {
    return mockDashboardData;
  }
}

export async function markMedicationTaken(medicationId: string): Promise<boolean> {
  try {
    await authService.post(`/dashboard/medications/${medicationId}/taken`, {});
    return true;
  } catch {
    return true;
  }
}

export async function startScreeningAssessment(): Promise<{ sessionId: string }> {
  try {
    const res = await authService.post<{ sessionId: string }>('/screening/start', {});
    return res.data;
  } catch {
    return { sessionId: 'mock-session-screening-1' };
  }
}
