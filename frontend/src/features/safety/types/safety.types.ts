export type ContactTag = 'Primary' | 'Caregiver' | 'Doctor' | 'Family';

export interface TrustedContactItem {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  tag: ContactTag;
  isPrimary: boolean;
  avatarUrl?: string;
  initials: string;
}

export type SafetyFeatureKey = 'location-sharing' | 'emergency-assistance' | 'safety-alerts';

export interface SafetyFeatureItem {
  id: SafetyFeatureKey;
  title: string;
  description: string;
  enabled: boolean;
  iconType: 'location' | 'assistance' | 'alerts';
}

export interface EmergencyBannerInfo {
  heading: string;
  subheading: string;
  buttonLabel: string;
}

export interface SafetyPageData {
  pageTitle: string;
  subtitle: string;
  contactsHeader: string;
  contacts: TrustedContactItem[];
  featuresHeader: string;
  features: SafetyFeatureItem[];
  emergencyBanner: EmergencyBannerInfo;
  footerNote: string;
}

