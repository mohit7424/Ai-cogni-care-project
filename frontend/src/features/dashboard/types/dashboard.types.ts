export interface DashboardStats {
  overallProgress: number; // e.g. 72
  completedActivities: number; // e.g. 5
  totalActivities: number; // e.g. 6
  trend: 'stable' | 'improving' | 'declining';
  accountStatus: 'active' | 'pending' | 'review';
}

export interface ProgressDataPoint {
  month: string;
  score: number;
  height: string;
  isCurrent?: boolean;
}

export interface NextStepAction {
  id: string;
  badge: string;
  title: string;
  description: string;
  actionText: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  category: string;
  scheduledTime: string;
  duration: string;
  completed: boolean;
}

export interface MedicationReminder {
  id: string;
  name: string;
  dosage: string;
  time: string;
  period: string; // e.g. 'Morning Dose'
  taken: boolean;
}

export interface DashboardData {
  patientName: string;
  greetingTime: string;
  stats: DashboardStats;
  nextStep: NextStepAction;
  progressChart: {
    timeframe: string;
    points: ProgressDataPoint[];
    improvementRate: string;
    statusSummary: string;
  };
  upcomingActivity: ActivityItem;
  medicationReminder: MedicationReminder;
}

