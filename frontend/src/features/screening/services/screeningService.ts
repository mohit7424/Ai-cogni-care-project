import { authService } from '@/features/auth/services/authService';
import type {
  ScreeningOverview,
  ScreeningHistoryItem,
  ScreeningQuestion,
  FinalScreeningResult,
} from '../types/screening.types';
import {
  mockScreeningOverview,
  mockQuestions,
  mockFinalResult,
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
