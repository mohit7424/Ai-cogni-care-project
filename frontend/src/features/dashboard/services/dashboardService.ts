import { authService } from '@/features/auth/services/authService';
import type { DashboardData } from '../types/dashboard.types';

// Mock initial data matching the exact dashboard UI
const mockDashboardData: DashboardData = {
  patientName: 'Alex Parker',
  greetingTime: 'Good morning',
  stats: {
    overallProgress: 72,
    completedActivities: 5,
    totalActivities: 6,
    trend: 'stable',
    accountStatus: 'active',
  },
  nextStep: {
    id: 'cognitive-screening',
    badge: 'Your Next Step',
    title: 'Cognitive Screening',
    description: 'Complete your screening to track your cognitive health with clinically backed assessments.',
    actionText: 'Start Screening',
  },
  progressChart: {
    timeframe: 'Last 6 Months',
    points: [
      { month: 'May', score: 65, height: '65%' },
      { month: 'Jun', score: 68, height: '68%' },
      { month: 'Jul', score: 72, height: '72%' },
      { month: 'Aug', score: 70, height: '70%' },
      { month: 'Sep', score: 72, height: '72%' },
      { month: 'Oct', score: 75, height: '75%', isCurrent: true },
    ],
    improvementRate: '+10% improvement',
    statusSummary: 'Stable & Healthy',
  },
  upcomingActivity: {
    id: 'act-1',
    title: 'Memory Exercise',
    category: 'Upcoming Activities',
    scheduledTime: 'Scheduled for Today',
    duration: '15 mins',
    completed: false,
  },
  medicationReminder: {
    id: 'med-1',
    name: 'Vitamin D (1000 IU)',
    dosage: '1000 IU',
    time: '08:00 AM',
    period: 'Morning Dose',
    taken: false,
  },
};

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

