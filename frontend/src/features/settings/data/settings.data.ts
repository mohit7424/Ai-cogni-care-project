import type { SettingsPageData } from '../types/settings.types';

export const mockSettingsData: SettingsPageData = {
  pageTitle: 'Settings & Privacy',
  subtitle: 'Manage your profile and preferences.',
  profile: {
    name: 'Alex Parker',
    patientId: 'CC-00258',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    email: 'alex.parker@example.com',
    phone: '+91 98765 43210',
    dateOfBirth: '15 Jan 1965',
    assignedCaregiver: 'Priya Sharma (Daughter)',
    residentialAddress: '42, Palm Grove Enclave, Green Meadows, Bengaluru',
    syncNotice: 'All fields synced with Care Record',
  },
  privacy: {
    biometricLock: true,
    hipaaAuditLogging: true,
    caregiverDataSharing: true,
    anonymousAnalytics: false,
  },
  notifications: {
    medicationAlerts: true,
    screeningReminders: true,
    weeklyProgressEmail: true,
    emergencySmsBackup: true,
  },
  preferences: {
    language: 'English (US)',
    fontSize: 'Standard',
    highContrast: false,
    soundEffects: true,
  },
};

