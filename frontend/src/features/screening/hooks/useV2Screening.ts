'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  V2ScreeningData,
  V2ScreeningResultData,
} from '../types/v2Screening.types';
import {
  getV2ScreeningData,
  submitV2ScreeningAnswers,
} from '../services/screeningService';
import { mockV2ScreeningData } from '../data/screening.data';

export type V2ScreeningStep =
  | 'attention'
  | 'memory'
  | 'review'
  | 'processing'
  | 'results'
  | 'history-trends';

export function useV2Screening() {
  // Initialize synchronously with mock data so there is never a blank screen / null render
  const [data, setData] = useState<V2ScreeningData>(mockV2ScreeningData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<V2ScreeningStep>('attention');
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({
    0: '10',
  });
  const [selectedMemoryItems, setSelectedMemoryItems] = useState<string[]>([
    'm-1', // Apple
    'm-2', // Car
    'm-4', // Tree
  ]);
  const [resultsData, setResultsData] = useState<V2ScreeningResultData>(
    mockV2ScreeningData.results
  );

  const loadData = useCallback(async () => {
    try {
      const res = await getV2ScreeningData();
      if (res && res.questions && res.questions.length > 0) {
        setData(res);
        if (res.results) {
          setResultsData(res.results);
        }
      }
    } catch {
      // Gracefully maintain mock fallback data
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const selectAnswer = useCallback((opt: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: opt }));
  }, [questionIndex]);

  const toggleMemoryItem = useCallback((id: string) => {
    setSelectedMemoryItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const nextQuestion = useCallback(() => {
    if (!data) return;
    if (questionIndex < data.questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else {
      setCurrentStep('memory');
    }
  }, [data, questionIndex]);

  const previousQuestion = useCallback(() => {
    if (questionIndex > 0) {
      setQuestionIndex(prev => prev - 1);
    }
  }, [questionIndex]);

  const resetScreening = useCallback(() => {
    setQuestionIndex(0);
    setSelectedAnswers({ 0: '10' });
    setSelectedMemoryItems(['m-1', 'm-2', 'm-4']);
    setCurrentStep('attention');
  }, []);

  const submitAnswers = useCallback(async () => {
    setCurrentStep('processing');
    const answersMap: Record<string, string> = {};
    Object.entries(selectedAnswers).forEach(([k, v]) => {
      answersMap[`q-${k}`] = v;
    });

    try {
      const res = await submitV2ScreeningAnswers(answersMap);
      if (res && res.overallScore) {
        setResultsData(res);
      }
    } catch {
      // Service handles mock fallback
    }
  }, [selectedAnswers]);

  return {
    data,
    isLoading,
    currentStep,
    setCurrentStep,
    questionIndex,
    setQuestionIndex,
    selectedAnswers,
    selectAnswer,
    selectedMemoryItems,
    toggleMemoryItem,
    nextQuestion,
    previousQuestion,
    resetScreening,
    submitAnswers,
    resultsData: resultsData || data.results,
    refetch: loadData,
  };
}
