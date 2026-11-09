'use client';

import { useState, useCallback } from 'react';
import type {
  ScreeningOverview,
  ScreeningStep,
  ScreeningQuestion,
  FinalScreeningResult,
} from '../types/screening.types';
import {
  getScreeningOverview,
  getScreeningQuestions,
  submitScreeningAnswers,
  startNewScreeningSession,
} from '../services/screeningService';
import {
  mockScreeningOverview,
  mockQuestions,
} from '../data/screening.data';

interface UseScreeningReturn {
  overviewData: ScreeningOverview | null;
  questions: ScreeningQuestion[];
  currentQuestionIndex: number;
  answers: Record<string, string>;
  finalResult: FinalScreeningResult | null;
  isLoading: boolean;
  isSubmitting: boolean;
  currentStep: ScreeningStep;
  setCurrentStep: (step: ScreeningStep) => void;
  handleAnswerSelect: (questionId: string, optionId: string) => void;
  handleNextQuestion: () => void;
  handlePreviousQuestion: () => void;
  handleStartScreening: () => Promise<void>;
  handleSubmitTest: () => Promise<void>;
  handleRestart: () => void;
  refetch: () => Promise<void>;
}

export function useScreening(): UseScreeningReturn {
  const [overviewData, setOverviewData] = useState<ScreeningOverview | null>(mockScreeningOverview);
  const [questions, setQuestions] = useState<ScreeningQuestion[]>(mockQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [finalResult, setFinalResult] = useState<FinalScreeningResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<ScreeningStep>('introduction');

  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const [overview, qList] = await Promise.all([
        getScreeningOverview(),
        getScreeningQuestions(),
      ]);
      setOverviewData(overview);
      setQuestions(qList);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStartScreening = useCallback(async () => {
    try {
      await startNewScreeningSession();
      setCurrentStep('questions');
      setCurrentQuestionIndex(0);
      setAnswers({});
      setFinalResult(null);
    } catch {
      // Fallback local
      setCurrentStep('questions');
    }
  }, []);

  const handleAnswerSelect = useCallback((questionId: string, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId,
    }));
  }, []);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentStep('review');
    }
  }, [currentQuestionIndex, questions.length]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const handleSubmitTest = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const result = await submitScreeningAnswers(answers);
      setFinalResult(result);
      setCurrentStep('results');
    } finally {
      setIsSubmitting(false);
    }
  }, [answers]);

  const handleRestart = useCallback(() => {
    setCurrentStep('introduction');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFinalResult(null);
  }, []);

  return {
    overviewData,
    questions,
    currentQuestionIndex,
    answers,
    finalResult,
    isLoading,
    isSubmitting,
    currentStep,
    setCurrentStep,
    handleAnswerSelect,
    handleNextQuestion,
    handlePreviousQuestion,
    handleStartScreening,
    handleSubmitTest,
    handleRestart,
    refetch,
  };
}
