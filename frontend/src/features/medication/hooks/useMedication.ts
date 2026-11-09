'use client';

import { useState, useCallback } from 'react';
import type {
  MedicationManagementData,
  MedicationDoseItem,
} from '../types/medication.types';
import {
  getMedicationData,
  markDoseAsTaken,
  addMedicationDose,
} from '../services/medicationService';
import { mockMedicationData } from '../data/medication.data';

export function useMedication() {
  const [data, setData] = useState<MedicationManagementData>(mockMedicationData);
  const [schedule, setSchedule] = useState<MedicationDoseItem[]>(
    mockMedicationData.schedule
  );
  const [nextReminderTaken, setNextReminderTaken] = useState<boolean>(
    mockMedicationData.nextReminder.isTaken
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getMedicationData();
      if (res && res.schedule) {
        setData(res);
        setSchedule(res.schedule);
        setNextReminderTaken(res.nextReminder.isTaken);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleMarkNextReminderAsTaken = useCallback(async () => {
    setNextReminderTaken(true);
    setSchedule(prev =>
      prev.map(item =>
        item.id === 'dose-1' ? { ...item, status: 'taken' } : item
      )
    );
    await markDoseAsTaken('dose-1');
  }, []);

  const handleToggleDoseStatus = useCallback(async (doseId: string) => {
    setSchedule(prev =>
      prev.map(item => {
        if (item.id === doseId) {
          const newStatus = item.status === 'taken' ? 'pending' : 'taken';
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
  }, []);

  const handleAddMedication = useCallback(
    async (newMed: Omit<MedicationDoseItem, 'id'>) => {
      const created = await addMedicationDose(newMed);
      setSchedule(prev => [...prev, created]);
    },
    []
  );

  const completedDoses = schedule.filter(d => d.status === 'taken').length;
  const totalDoses = schedule.length;

  return {
    data,
    schedule,
    nextReminderTaken,
    completedDoses,
    totalDoses,
    isAddModalOpen,
    setIsAddModalOpen,
    isLoading,
    handleMarkNextReminderAsTaken,
    handleToggleDoseStatus,
    handleAddMedication,
    refetch,
  };
}
