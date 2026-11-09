import { authService } from '@/features/auth/services/authService';
import type {
  DailySupportOverviewData,
  ActivityCardItem,
  CompletedActivityResult,
} from '../types/dailySupport.types';
import {
  mockDailySupportOverview,
  mockActivityLibrary,
  mockCompletedResultsMap,
  mockCompletedResult,
} from '../data/dailySupport.data';

export async function getDailySupportOverview(): Promise<DailySupportOverviewData> {
  try {
    const res = await authService.get<DailySupportOverviewData>('/daily-support/overview');
    if (res.data && Object.keys(res.data).length > 0) {
      return res.data;
    }
    return mockDailySupportOverview;
  } catch {
    return mockDailySupportOverview;
  }
}

export async function getActivityLibrary(): Promise<ActivityCardItem[]> {
  try {
    const res = await authService.get<ActivityCardItem[]>('/daily-support/library');
    if (res.data && res.data.length > 0) {
      return res.data;
    }
    return mockActivityLibrary;
  } catch {
    return mockActivityLibrary;
  }
}

export async function submitExerciseCompletion(
  activityId: string,
  timeTaken: string
): Promise<CompletedActivityResult> {
  try {
    const res = await authService.post<CompletedActivityResult>('/daily-support/submit', {
      activityId,
      timeTaken,
    });
    if (res.data && res.data.scorePercent) {
      return res.data;
    }
    return mockCompletedResultsMap[activityId] || mockCompletedResult;
  } catch {
    return mockCompletedResultsMap[activityId] || mockCompletedResult;
  }
}
