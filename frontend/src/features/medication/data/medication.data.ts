import type { MedicationManagementData } from '../types/medication.types';

export const mockMedicationData: MedicationManagementData = {
  pageTitle: 'Medication Management',
  subtitle: 'Never miss your medication.',
  dateBadge: 'Today, 24 Oct',
  nextReminder: {
    id: 'rem-1',
    time: '08:00 AM',
    medicationName: 'Vitamin D (1000 IU)',
    instruction: 'Take with meal or water after breakfast',
    isTaken: false,
  },
  schedule: [
    {
      id: 'dose-1',
      timeFormatted: '08:00',
      name: 'Vitamin D (1000 IU)',
      dosageDetails: '1 Capsule • Morning dose',
      instructions: 'Take with meal or water after breakfast',
      status: 'taken',
      period: 'morning',
    },
    {
      id: 'dose-2',
      timeFormatted: '02:00',
      name: 'Calcium (500 mg)',
      dosageDetails: '1 Tablet • Afternoon with lunch',
      instructions: 'Take after lunch with water',
      status: 'pending',
      period: 'afternoon',
    },
    {
      id: 'dose-3',
      timeFormatted: '08:00',
      name: 'Multivitamin',
      dosageDetails: '1 Tablet • Night dose after dinner',
      instructions: 'Take after dinner before sleep',
      status: 'pending',
      period: 'night',
    },
  ],
  advisoryHeader: 'Caregiver Advisory & Dosage Notes',
  doctorAttribution: 'Updated by Dr. Sarah Jenkins (Geriatric Specialist)',
  advisories: [
    {
      id: 'adv-1',
      title: 'Consistency Tracker',
      content:
        'Ensure Vitamin D is given regularly in the morning alongside breakfast for optimal cognitive focus.',
    },
    {
      id: 'adv-2',
      title: 'Refill Notice',
      content:
        'Multivitamin supply is low (4 days left). Automatic pharmacy refill requested for next Monday.',
    },
    {
      id: 'adv-3',
      title: 'Assistance Mode',
      content:
        "Audio notification alert is active on Alex's home smart display for afternoon reminders.",
    },
  ],
};

