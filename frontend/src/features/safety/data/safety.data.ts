import type { SafetyPageData } from '../types/safety.types';

export const mockSafetyData: SafetyPageData = {
  pageTitle: 'Safety & Trusted Contacts',
  subtitle: 'Your safety is our priority.',
  contactsHeader: 'Trusted Contacts',
  contacts: [
    {
      id: 'c-1',
      name: 'Priya Sharma',
      relationship: 'Daughter • Primary Caregiver',
      phone: '+1 (555) 349-2041',
      tag: 'Primary',
      isPrimary: true,
      initials: 'PS',
    },
    {
      id: 'c-2',
      name: 'Rohit Sharma',
      relationship: 'Son • Caregiver',
      phone: '+1 (555) 782-9912',
      tag: 'Caregiver',
      isPrimary: false,
      initials: 'RS',
    },
  ],
  featuresHeader: 'Safety Features',
  features: [
    {
      id: 'location-sharing',
      title: 'Location Sharing',
      description: 'Live GPS tracking visible to primary contacts',
      enabled: true,
      iconType: 'location',
    },
    {
      id: 'emergency-assistance',
      title: 'Emergency Assistance',
      description: 'Instant dispatch and rapid contact auto-dial',
      enabled: true,
      iconType: 'assistance',
    },
    {
      id: 'safety-alerts',
      title: 'Safety Alerts',
      description: 'Notifies caretakers of abnormal movement or falls',
      enabled: true,
      iconType: 'alerts',
    },
  ],
  emergencyBanner: {
    heading: 'In case of emergency, help is just a tap away.',
    subheading: 'Caregivers and registered emergency response teams are continuously on standby.',
    buttonLabel: 'EMERGENCY CALL (SOS)',
  },
  footerNote: 'Automated checks active 24/7',
};

