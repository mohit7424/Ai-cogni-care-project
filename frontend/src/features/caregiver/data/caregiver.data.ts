import type { CaregiverDashboardData } from '../types/caregiver.types';

export const mockCaregiverDashboardData: CaregiverDashboardData = {
  caregiver: {
    id: 'cg-001',
    name: 'Maya Sharma',
    initials: 'MS',
    relationship: 'Caregiver',
  },
  dateLabel: 'Tuesday, 11 November 2026',
  lastUpdatedLabel: 'Last updated: Today at 10:05 AM',

  linkedPatients: [
    {
      id: 'pt-001',
      name: 'Alex Parker',
      patientCode: 'CC-00258',
      age: 68,
      gender: 'Male',
      relationship: 'Son',
      linkStatus: 'active',
      lastActivity: '2 hours ago',
      cognitiveStatus: 'Normal',
      mmseScore: {
        score: 26,
        total: 30,
        clinicalRange: 'Normal',
        date: '2026-10-28',
      },
      nextAppointment: '14 Nov 2026, 10:30 AM',
      pendingTasks: 2,
      hasAlert: false,
    },
    {
      id: 'pt-002',
      name: 'Eleanor Vance',
      patientCode: 'CC-00142',
      age: 74,
      gender: 'Female',
      relationship: 'Daughter',
      linkStatus: 'active',
      lastActivity: '5 hours ago',
      cognitiveStatus: 'Mild Cognitive Impairment',
      mmseScore: {
        score: 22,
        total: 30,
        clinicalRange: 'Mild Cognitive Impairment',
        date: '2026-10-30',
      },
      nextAppointment: '18 Nov 2026, 02:00 PM',
      pendingTasks: 3,
      hasAlert: true,
    },
  ],

  summaryStats: {
    totalLinkedPatients: 2,
    activeAlerts: 1,
    pendingTasks: 5,
    upcomingAppointments: 2,
    activitiesDueToday: 3,
    medicationsDue: 2,
  },

  recentActivity: [
    {
      id: 'ra-001',
      patientName: 'Alex Parker',
      event: 'Completed MMSE screening session',
      time: '09:30 AM',
      type: 'screening',
    },
    {
      id: 'ra-002',
      patientName: 'Eleanor Vance',
      event: 'Missed morning medication — Aricept 5mg',
      time: '09:00 AM',
      type: 'medication',
    },
    {
      id: 'ra-003',
      patientName: 'Alex Parker',
      event: 'Completed morning physical exercise',
      time: '08:45 AM',
      type: 'activity',
    },
    {
      id: 'ra-004',
      patientName: 'Eleanor Vance',
      event: 'Word puzzle activity started',
      time: '11:15 AM',
      type: 'activity',
    },
  ],

  upcomingAppointments: [
    {
      id: 'apt-001',
      patientName: 'Alex Parker',
      doctorName: 'Dr. Sarah Jenkins',
      dateTime: '14 Nov 2026, 10:30 AM',
      method: 'In-person',
      status: 'Confirmed',
    },
    {
      id: 'apt-002',
      patientName: 'Eleanor Vance',
      doctorName: 'Dr. Sarah Jenkins',
      dateTime: '18 Nov 2026, 02:00 PM',
      method: 'Video Call',
      status: 'Scheduled',
    },
  ],

  activeAlerts: [
    {
      id: 'al-001',
      patientName: 'Eleanor Vance',
      alertType: 'Missed morning medication reminder',
      severity: 'high',
      time: '09:00 AM today',
      acknowledged: false,
    },
  ],

  pendingActivities: [
    {
      id: 'pa-001',
      patientName: 'Eleanor Vance',
      activity: 'Memory Card Matching Exercise',
      dueTime: '11:00 AM',
      category: 'Cognitive',
      completed: false,
    },
    {
      id: 'pa-002',
      patientName: 'Eleanor Vance',
      activity: 'Medication Reminder — Aricept 5mg',
      dueTime: '09:00 AM',
      category: 'Medication',
      completed: false,
    },
    {
      id: 'pa-003',
      patientName: 'Alex Parker',
      activity: 'Evening Daily Check-in',
      dueTime: '06:00 PM',
      category: 'Wellness',
      completed: false,
    },
  ],
};
