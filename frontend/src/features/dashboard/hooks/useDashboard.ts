'use client';

import { useState, useCallback } from 'react';
import type { DashboardData } from '../types/dashboard.types';
import {
  getDashboardData,
  markMedicationTaken as apiMarkMedicationTaken,
  startScreeningAssessment as apiStartScreening,
} from '../services/dashboardService';
import { mockDashboardData } from '../data/dashboard.data';

interface UseDashboardReturn {
  data: DashboardData;
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
  const [data, setData] = useState<DashboardData>(mockDashboardData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeNavTab, setActiveNavTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getDashboardData();
      setData(result);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStartScreening = useCallback(async () => {
    try {
      await apiStartScreening();
    } catch {
      // Fallback
    }
  }, []);

  const handleMarkMedication = useCallback(async (id: string) => {
    try {
      await apiMarkMedicationTaken(id);
    } catch {
      // Fallback
    }
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
    refetch,
  };
}
