'use client';
import { useState } from 'react';
import { mockCaregiverDashboardData } from '../data/caregiver.data';
import type { LinkedPatient } from '../types/caregiver.types';

export function useCaregiver() {
  const [data] = useState(mockCaregiverDashboardData);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(
    data.linkedPatients[0]?.id ?? ''
  );
  const selectedPatient: LinkedPatient =
    data.linkedPatients.find(p => p.id === selectedPatientId) ??
    data.linkedPatients[0];
  return { data, selectedPatient, selectedPatientId, setSelectedPatientId };
}
