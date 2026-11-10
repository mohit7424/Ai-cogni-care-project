export type ContactTag = 'Primary' | 'Caregiver' | 'Doctor' | 'Family' | 'Sister' | 'Friend' | 'Parent';

export interface TrustedContactItem {
  id: string;
  name: string;
  email: string;
  relationship: string;
  phone: string;
  status: 'Verified' | 'Pending';
  avatarUrl?: string;
  initials: string;
  isPrimary?: boolean;
  tag?: ContactTag;
}

export interface EmergencyBannerInfo {
  heading: string;
  subheading: string;
  buttonLabel: string;
}

export type SafetyFeatureKey = 'location' | 'assistance' | 'alerts';

export interface SafetyFeatureItem {
  id: SafetyFeatureKey;
  title: string;
  description: string;
  enabled: boolean;
  iconType: SafetyFeatureKey;
}

export type AlertStatus = 'Triggered' | 'Resolved' | 'Cancelled';
export type SmsStatus = 'SMS Sent' | 'Delivered' | 'Failed';

export interface RecentSafetyAlertItem {
  id: string;
  triggeredAt: string;
  status: AlertStatus;
  smsStatus: SmsStatus;
  contactsNotified: string;
  location?: string;
}

export interface HowItWorksStep {
  stepNumber: number;
  title: string;
  description: string;
  color: 'rose' | 'teal' | 'emerald';
}

export interface ManualSosBannerInfo {
  title: string;
  subtitle: string;
  statusLabel: string;
  buttonLabel: string;
  callHelpLabel: string;
  smsNotice: string;
  helplinePhone?: string;
}

export interface SafetyPageData {
  pageTitle: string;
  subtitle: string;
  manualSos: ManualSosBannerInfo;
  contacts: TrustedContactItem[];
  recentAlerts: RecentSafetyAlertItem[];
  howItWorks: HowItWorksStep[];
}
