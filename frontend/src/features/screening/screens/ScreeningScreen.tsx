'use client';

import React, { useState } from 'react';
import {
  V2AttentionQuestion,
  V2MemoryRecall,
  V2ReviewAnswers,
  V2SubmissionProcessing,
  V2ScreeningResults,
  V2HistoryTrends,
} from '../components/v2';

export type V2ScreeningStep =
  | 'attention'
  | 'memory'
  | 'review'
  | 'processing'
  | 'results'
  | 'history-trends';

export default function ScreeningScreen() {
  const [currentStep, setCurrentStep] = useState<V2ScreeningStep>('attention');

  const navSteps: { id: V2ScreeningStep; label: string }[] = [
    { id: 'attention', label: '1. Attention & Focus' },
    { id: 'memory', label: '2. Memory Recall' },
    { id: 'review', label: '3. Review Answers' },
    { id: 'processing', label: '4. Processing' },
    { id: 'results', label: '5. Results (86%)' },
    { id: 'history-trends', label: '6. History & Trends' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Wizard Step Switcher matching the uploaded 6 designs */}
      <div className="bg-white rounded-2xl border border-teal-100/90 p-2 shadow-2xs overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2">
            Screening Wizard:
          </span>
          {navSteps.map(step => (
            <button
              key={step.id}
              type="button"
              onClick={() => setCurrentStep(step.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                currentStep === step.id
                  ? 'bg-[#0d9488] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {step.label}
            </button>
          ))}
        </div>
      </div>

      {/* RENDER THE EXACT MATCHING VIEW */}
      <div>
        {/* VIEW 1: Attention & Focus (2, 4, 6, 8, ?) */}
        {currentStep === 'attention' && (
          <V2AttentionQuestion
            onNext={() => setCurrentStep('memory')}
            onPrevious={() => setCurrentStep('attention')}
            onBackToOverview={() => setCurrentStep('history-trends')}
          />
        )}

        {/* VIEW 2: Memory Recall (Apple, Car, Chair, Tree, Football, Book) */}
        {currentStep === 'memory' && (
          <V2MemoryRecall
            onContinue={() => setCurrentStep('review')}
            onBackToOverview={() => setCurrentStep('attention')}
          />
        )}

        {/* VIEW 3: Review Answers with Total Time (12 min 35 sec) */}
        {currentStep === 'review' && (
          <V2ReviewAnswers
            onBack={() => setCurrentStep('memory')}
            onSubmit={() => setCurrentStep('processing')}
          />
        )}

        {/* VIEW 4: Submitting Your Screening 3-stage Pipeline */}
        {currentStep === 'processing' && (
          <V2SubmissionProcessing
            onComplete={() => setCurrentStep('results')}
          />
        )}

        {/* VIEW 5: 86% Results with Cognitive Domains Breakdown */}
        {currentStep === 'results' && (
          <V2ScreeningResults
            onViewDetailedReport={() => setCurrentStep('history-trends')}
          />
        )}

        {/* VIEW 6: Screening History & 86% Progress Trend Line Chart */}
        {currentStep === 'history-trends' && (
          <V2HistoryTrends
            onRetake={() => setCurrentStep('attention')}
          />
        )}
      </div>
    </div>
  );
}
