'use client';

import { useState, useCallback } from 'react';
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
  | 'memory-recall'
  | 'review'
  | 'processing'
  | 'results'
  | 'history-trends';

export function useV2Screening() {
  // Initialize synchronously with mock data so there is never a blank screen / null render
  const [data, setData] = useState<V2ScreeningData>(mockV2ScreeningData);
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

  const refetch = useCallback(async () => {
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

  const selectAnswer = useCallback((opt: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: opt }));
  }, [questionIndex]);

  const toggleMemoryItem = useCallback((itemId: string) => {
    setSelectedMemoryItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep === 'attention') {
      if (questionIndex < data.questions.length - 1) {
        setQuestionIndex(i => i + 1);
      } else {
        setCurrentStep('memory-recall');
      }
    } else if (currentStep === 'memory-recall') {
      setCurrentStep('review');
    } else if (currentStep === 'review') {
      setCurrentStep('processing');
    } else if (currentStep === 'processing') {
      setCurrentStep('results');
    } else if (currentStep === 'results') {
      setCurrentStep('history-trends');
    }
  }, [currentStep, questionIndex, data.questions.length]);

  const prevStep = useCallback(() => {
    if (currentStep === 'attention' && questionIndex > 0) {
      setQuestionIndex(i => i - 1);
    } else if (currentStep === 'memory-recall') {
      setCurrentStep('attention');
    } else if (currentStep === 'review') {
      setCurrentStep('memory-recall');
    } else if (currentStep === 'results') {
      setCurrentStep('review');
    } else if (currentStep === 'history-trends') {
      setCurrentStep('results');
    }
  }, [currentStep, questionIndex]);

  const submitAnswers = useCallback(async () => {
    setCurrentStep('processing');
    const res = await submitV2ScreeningAnswers(selectedAnswers);
    setResultsData(res);
    setCurrentStep('results');
  }, [selectedAnswers]);

  const resetScreening = useCallback(() => {
    setQuestionIndex(0);
    setCurrentStep('attention');
    setSelectedAnswers({ 0: '10' });
    setSelectedMemoryItems(['m-1', 'm-2', 'm-4']);
  }, []);

  return {
    data,
    currentStep,
    setCurrentStep,
    questionIndex,
    setQuestionIndex,
    currentQuestion: data.questions[questionIndex],
    selectedAnswers,
    selectedMemoryItems,
    resultsData,
    selectAnswer,
    toggleMemoryItem,
    nextStep,
    prevStep,
    submitAnswers,
    resetScreening,
    refetch,
  };
}
