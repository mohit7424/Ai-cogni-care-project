import { authService } from '@/features/auth/services/authService';
import type {
  ScreeningOverview,
  ScreeningHistoryItem,
  ScreeningQuestion,
  FinalScreeningResult,
  V2ScreeningData,
  V2ScreeningResultData,
} from '../types';
import {
  mockScreeningOverview,
  mockQuestions,
  mockFinalResult,
  mockV2ScreeningData,
} from '../data/screening.data';

export async function getScreeningOverview(): Promise<ScreeningOverview> {
  try {
    const res = await authService.get<ScreeningOverview>('/screening/overview');
    if (res.data && Object.keys(res.data).length > 0) {
      return res.data;
    }
    return mockScreeningOverview;
  } catch {
    return mockScreeningOverview;
  }
}

export async function getScreeningHistory(): Promise<ScreeningHistoryItem[]> {
  try {
    const res = await authService.get<ScreeningHistoryItem[]>('/screening/history');
    if (res.data && res.data.length > 0) {
      return res.data;
    }
    return mockScreeningOverview.history;
  } catch {
    return mockScreeningOverview.history;
  }
}

export async function getScreeningQuestions(): Promise<ScreeningQuestion[]> {
  try {
    const res = await authService.get<ScreeningQuestion[]>('/screening/questions');
    if (res.data && res.data.length > 0) {
      return res.data;
    }
    return mockQuestions;
  } catch {
    return mockQuestions;
  }
}

export async function submitScreeningAnswers(
  answers: Record<string, string>
): Promise<FinalScreeningResult> {
  try {
    const res = await authService.post<FinalScreeningResult>('/screening/submit', { answers });
    if (res.data && res.data.totalScore) {
      return res.data;
    }
    return mockFinalResult;
  } catch {
    return mockFinalResult;
  }
}

export async function startNewScreeningSession(): Promise<{ sessionId: string }> {
  try {
    const res = await authService.post<{ sessionId: string }>('/screening/session/start', {});
    return res.data;
  } catch {
    return { sessionId: 'session-moca-live-1' };
  }
}

export async function getV2ScreeningData(): Promise<V2ScreeningData> {
  try {
    const res = await authService.get<V2ScreeningData>('/screening/v2/data');
    if (res.data && res.data.questions && res.data.questions.length > 0) {
      return res.data;
    }
    return mockV2ScreeningData;
  } catch {
    return mockV2ScreeningData;
  }
}

export async function submitV2ScreeningAnswers(
  answers: Record<string, string>
): Promise<V2ScreeningResultData> {
  try {
    const res = await authService.post<V2ScreeningResultData>('/screening/v2/submit', { answers });
    if (res.data && res.data.overallScore) {
      return res.data;
    }
    return mockV2ScreeningData.results;
  } catch {
    return mockV2ScreeningData.results;
  }
}

