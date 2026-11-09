'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  MedicationManagementData,
  MedicationDoseItem,
} from '../types/medication.types';
import {
  getMedicationData,
  markDoseAsTaken,
  createNewMedicationDose,
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

  const fetchData = useCallback(async () => {
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

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

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
    await markDoseAsTaken(doseId);
  }, []);

  const handleAddMedication = useCallback(
    async (newDose: Omit<MedicationDoseItem, 'id'>) => {
      const created = await createNewMedicationDose(newDose);
      setSchedule(prev => [...prev, created]);
      setIsAddModalOpen(false);
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
    handleMarkNextReminderAsTaken,
    handleToggleDoseStatus,
    handleAddMedication,
    isLoading,
    refetch: fetchData,
  };
}

