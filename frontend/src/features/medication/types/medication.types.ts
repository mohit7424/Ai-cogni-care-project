export type DoseStatus = 'taken' | 'pending' | 'skipped';

export interface MedicationDoseItem {
  id: string;
  timeFormatted: string; // e.g. "08:00"
  name: string; // e.g. "Vitamin D (1000 IU)"
  dosageDetails: string; // e.g. "1 Capsule • Morning dose"
  instructions?: string; // e.g. "Take with meal or water after breakfast"
  status: DoseStatus;
  period: 'morning' | 'afternoon' | 'evening' | 'night';
}

export interface NextReminderInfo {
  id: string;
  time: string; // e.g. "08:00 AM"
  medicationName: string; // e.g. "Vitamin D (1000 IU)"
  instruction: string; // e.g. "Take with meal or water after breakfast"
  isTaken: boolean;
}

export interface CaregiverAdvisoryCardItem {
  id: string;
  title: string;
  content: string;
}

export interface MedicationManagementData {
  pageTitle: string;
  subtitle: string;
  dateBadge: string;
  nextReminder: NextReminderInfo;
  schedule: MedicationDoseItem[];
  advisoryHeader: string;
  doctorAttribution: string;
  advisories: CaregiverAdvisoryCardItem[];
}

