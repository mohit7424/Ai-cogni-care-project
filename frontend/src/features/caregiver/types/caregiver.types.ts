export interface LinkedPatient {
  id: string;
  name: string;
  patientCode: string;
  age: number;
  gender: string;
  relationship: string;
  linkStatus: 'active' | 'pending' | 'revoked';
  lastActivity: string;
  cognitiveStatus: string;
  mmseScore?: { score: number; total: number; clinicalRange: string; date: string };
  nextAppointment?: string;
  pendingTasks: number;
  hasAlert: boolean;
}

export interface CaregiverDashboardData {
  caregiver: { id: string; name: string; initials: string; relationship: string };
  dateLabel: string;
  lastUpdatedLabel: string;
  linkedPatients: LinkedPatient[];
  summaryStats: {
    totalLinkedPatients: number;
    activeAlerts: number;
    pendingTasks: number;
    upcomingAppointments: number;
    activitiesDueToday: number;
    medicationsDue: number;
  };
  recentActivity: Array<{
    id: string;
    patientName: string;
    event: string;
    time: string;
    type: 'screening' | 'medication' | 'activity' | 'alert' | 'appointment';
  }>;
  upcomingAppointments: Array<{
    id: string;
    patientName: string;
    doctorName: string;
    dateTime: string;
    method: string;
    status: string;
  }>;
  activeAlerts: Array<{
    id: string;
    patientName: string;
    alertType: string;
    severity: 'high' | 'medium' | 'low';
    time: string;
    acknowledged: boolean;
  }>;
  pendingActivities: Array<{
    id: string;
    patientName: string;
    activity: string;
    dueTime: string;
    category: string;
    completed: boolean;
  }>;
}
