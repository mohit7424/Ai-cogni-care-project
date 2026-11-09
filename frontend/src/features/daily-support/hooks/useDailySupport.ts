'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  DailySupportView,
  DailySupportOverviewData,
  ActivityCardItem,
  ActivityCategory,
  CompletedActivityResult,
} from '../types/dailySupport.types';
import {
  getDailySupportOverview,
  getActivityLibrary,
  submitExerciseCompletion,
} from '../services/dailySupportService';

interface UseDailySupportReturn {
  overviewData: DailySupportOverviewData | null;
  activityList: ActivityCardItem[];
  completedResult: CompletedActivityResult | null;
  currentView: DailySupportView;
  setCurrentView: (view: DailySupportView) => void;
  activeActivityId: string;
  setActiveActivityId: (id: string) => void;
  selectedCategory: ActivityCategory;
  setSelectedCategory: (cat: ActivityCategory) => void;
  filteredActivities: ActivityCardItem[];
  isLoading: boolean;
  handleLaunchActivity: (actId: string) => void;
  handleFinishExercise: (overrideActId?: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useDailySupport(): UseDailySupportReturn {
  const [overviewData, setOverviewData] = useState<DailySupportOverviewData | null>(null);
  const [activityList, setActivityList] = useState<ActivityCardItem[]>([]);
  const [completedResult, setCompletedResult] = useState<CompletedActivityResult | null>(null);
  const [currentView, setCurrentView] = useState<DailySupportView>('overview');
  const [activeActivityId, setActiveActivityId] = useState<string>('act-1');
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [overview, activities] = await Promise.all([
        getDailySupportOverview(),
        getActivityLibrary(),
      ]);
      setOverviewData(overview);
      setActivityList(activities);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const filteredActivities =
    selectedCategory === 'All'
      ? activityList
      : activityList.filter(item => item.category === selectedCategory);

  const handleLaunchActivity = useCallback((actId: string) => {
    setActiveActivityId(actId);
    setCurrentView('game-exercise');
  }, []);

  const handleFinishExercise = useCallback(
    async (overrideActId?: string) => {
      const targetId = overrideActId || activeActivityId;
      const res = await submitExerciseCompletion(targetId, '04 min 28 sec');
      setCompletedResult(res);
      setCurrentView('completed');
    },
    [activeActivityId]
  );

  return {
    overviewData,
    activityList,
    completedResult,
    currentView,
    setCurrentView,
    activeActivityId,
    setActiveActivityId,
    selectedCategory,
    setSelectedCategory,
    filteredActivities,
    isLoading,
    handleLaunchActivity,
    handleFinishExercise,
    refetch: fetchData,
  };
}
