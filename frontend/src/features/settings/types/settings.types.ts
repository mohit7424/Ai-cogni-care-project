export type SettingsTab = 'Profile' | 'Privacy' | 'Notifications' | 'Preferences';

export interface UserProfileData {
  name: string;
  patientId: string;
  avatarUrl: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  assignedCaregiver: string;
  residentialAddress: string;
  syncNotice: string;
}

export interface PrivacySettings {
  biometricLock: boolean;
  hipaaAuditLogging: boolean;
  caregiverDataSharing: boolean;
  anonymousAnalytics: boolean;
}

export interface NotificationSettings {
  medicationAlerts: boolean;
  screeningReminders: boolean;
  weeklyProgressEmail: boolean;
  emergencySmsBackup: boolean;
}

export interface PreferenceSettings {
  language: string;
  fontSize: 'Standard' | 'Large' | 'Extra Large';
  highContrast: boolean;
  soundEffects: boolean;
}

export interface SettingsPageData {
  pageTitle: string;
  subtitle: string;
  profile: UserProfileData;
  privacy: PrivacySettings;
  notifications: NotificationSettings;
  preferences: PreferenceSettings;
}

