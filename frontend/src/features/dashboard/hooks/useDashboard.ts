'use client';

import { useState, useEffect, useCallback } from 'react';
import type { DashboardData } from '../types/dashboard.types';
import {
  getDashboardData,
  markMedicationTaken as apiMarkMedicationTaken,
  startScreeningAssessment as apiStartScreening,
} from '../services/dashboardService';

interface UseDashboardReturn {
  data: DashboardData | null;
  isLoading: boolean;
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleStartScreening: () => Promise<void>;
  handleMarkMedication: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useDashboard(): UseDashboardReturn {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeNavTab, setActiveNavTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getDashboardData();
      setData(result);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchData();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchData]);

  const handleStartScreening = useCallback(async () => {
    try {
      await apiStartScreening();
      // Can route to assessment page once created
      alert('Screening session initialized! Navigating to assessment...');
    } catch {
      alert('Unable to start screening right now.');
    }
  }, []);

  const handleMarkMedication = useCallback(async (id: string) => {
    await apiMarkMedicationTaken(id);
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        medicationReminder: {
          ...prev.medicationReminder,
          taken: true,
        },
      };
    });
  }, []);

  return {
    data,
    isLoading,
    activeNavTab,
    setActiveNavTab,
    searchQuery,
    setSearchQuery,
    handleStartScreening,
    handleMarkMedication,
    refetch: fetchData,
  };
}
