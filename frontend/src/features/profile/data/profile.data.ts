import type { PatientProfileData } from '../types/profile.types';

export const mockPatientProfile: PatientProfileData = {
  name: 'Alex Parker',
  patientId: 'CC-00258',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  age: 61,
  gender: 'Male',
  bloodGroup: 'O+',
  memberSince: 'October 2024',
  email: 'alex.parker@example.com',
  phone: '+91 98765 43210',
  address: '42, Palm Grove Enclave, Green Meadows, Bengaluru, 560034',
  cognitiveStatus: 'Stable Baseline',
  latestScore: '26 / 30',
  medicationAdherence: '85%',
  careTeam: [
    {
      name: 'Dr. Sarah Jenkins, MD',
      role: 'Lead Geriatric Specialist',
      clinic: 'Department of Neuro-Geriatrics, Apex Health',
    },
    {
      name: 'Dr. E. Martinez, MD',
      role: 'Attending Neuro-Radiologist',
      clinic: 'Volumetric Brain Imaging Center',
    },
  ],
  emergencyContacts: [
    {
      name: 'Priya Sharma',
      relationship: 'Daughter • Primary Caregiver',
      phone: '+1 (555) 349-2041',
      isPrimary: true,
    },
    {
      name: 'Rohit Sharma',
      relationship: 'Son • Emergency Caregiver',
      phone: '+1 (555) 782-9912',
      isPrimary: false,
    },
  ],
};

