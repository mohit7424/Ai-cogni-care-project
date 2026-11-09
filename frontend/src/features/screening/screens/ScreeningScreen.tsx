'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useV2Screening, type V2ScreeningStep } from '../hooks/useV2Screening';
import {
  V2AttentionQuestion,
  V2MemoryRecall,
  V2ReviewAnswers,
  V2SubmissionProcessing,
  V2ScreeningResults,
  V2HistoryTrends,
} from '../components/v2';
import {
  Sub1Overview,
  Sub2Consent,
  Sub3Introduction,
  Sub4MCQQuestion,
  Sub5MemoryQuestion,
  Sub6ReviewAnswers,
  Sub7SubmissionProcessing,
  Sub8ScreeningResults,
  Sub9ScreeningHistory,
  Sub10DetailedTrends,
} from '../components/subpages';

export default function ScreeningScreen() {
  const router = useRouter();
  const [suiteMode, setSuiteMode] = useState<'v2' | 'subpages'>('v2');
  const [subpageStep, setSubpageStep] = useState<number>(1);

  const {
    data,
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
    resultsData,
  } = useV2Screening();

  const v2StepsList: { id: V2ScreeningStep; label: string }[] = [
    { id: 'attention', label: '1. Attention & Focus' },
    { id: 'memory', label: '2. Memory Recall' },
    { id: 'review', label: '3. Review Answers' },
    { id: 'processing', label: '4. Processing' },
    { id: 'results', label: '5. Results (86%)' },
    { id: 'history-trends', label: '6. History & Trends' },
  ];

  const subpagesList = [
    '1. Overview',
    '2. Consent',
    '3. Intro',
    '4. MCQ',
    '5. Memory',
    '6. Review',
    '7. Process',
    '8. Result',
    '9. History',
    '10. Trends',
  ];

  return (
    <div className="space-y-6">
      {/* Top Suite Mode & Step Navigation Strip */}
      <div className="bg-white rounded-2xl border border-teal-100/90 p-2.5 shadow-2xs space-y-2">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Flow Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-gray-100/80 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setSuiteMode('v2')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                suiteMode === 'v2'
                  ? 'bg-white text-[#0d9488] shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              V2 Interactive Flow (6 Views)
            </button>
            <button
              type="button"
              onClick={() => setSuiteMode('subpages')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                suiteMode === 'subpages'
                  ? 'bg-white text-[#0d9488] shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              10 Sub-Pages Flow
            </button>
          </div>

          <div className="text-[11px] text-gray-500 font-medium">
            Active Data: <span className="font-bold text-teal-800">screening.data.ts</span> (V2 + MoCA)
          </div>
        </div>

        {/* Steps Sub-Bar */}
        <div className="overflow-x-auto pt-1 border-t border-gray-100">
          {suiteMode === 'v2' ? (
            <div className="flex items-center gap-1.5 min-w-max">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2">
                V2 Views:
              </span>
              {v2StepsList.map(step => (
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
          ) : (
            <div className="flex items-center gap-1.5 min-w-max">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2">
                All Subpages:
              </span>
              {subpagesList.map((label, idx) => {
                const stepNum = idx + 1;
                return (
                  <button
                    key={stepNum}
                    type="button"
                    onClick={() => setSubpageStep(stepNum)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      subpageStep === stepNum
                        ? 'bg-[#0d9488] text-white shadow-xs'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* RENDER ACTIVE MODE */}
      {suiteMode === 'v2' ? (
        <div>
          {/* VIEW 1: Attention & Focus (2, 4, 6, 8, ?) */}
          {currentStep === 'attention' && (
            <V2AttentionQuestion
              questions={data.questions}
              currentIndex={questionIndex}
              selectedOption={selectedAnswers[questionIndex]}
              onSelectOption={selectAnswer}
              onNext={nextQuestion}
              onPrevious={previousQuestion}
              onBackToOverview={() => router.push('/dashboard')}
              timer={data.initialTimer}
            />
          )}

          {/* VIEW 2: Memory Recall (Apple, Car, Chair, Tree, Football, Book) */}
          {currentStep === 'memory' && (
            <V2MemoryRecall
              items={data.memoryRecall.items}
              instruction={data.memoryRecall.instruction}
              studyTimeSeconds={data.memoryRecall.studyTimeSeconds}
              selectedItemIds={selectedMemoryItems}
              onToggleItem={toggleMemoryItem}
              onContinue={() => setCurrentStep('review')}
              onBackToOverview={() => setCurrentStep('attention')}
            />
          )}

          {/* VIEW 3: Review Answers with Total Time (12 min 35 sec) */}
          {currentStep === 'review' && (
            <V2ReviewAnswers
              sections={data.review.sections}
              totalTimeFormatted={data.review.totalTimeFormatted}
              onBack={() => setCurrentStep('memory')}
              onEditSection={sectionId => {
                if (sectionId === 'sec-3') {
                  setCurrentStep('memory');
                } else {
                  setQuestionIndex(0);
                  setCurrentStep('attention');
                }
              }}
              onSubmit={() => {
                void submitAnswers();
              }}
            />
          )}

          {/* VIEW 4: Submitting Your Screening 3-stage Pipeline */}
          {currentStep === 'processing' && (
            <V2SubmissionProcessing
              stages={data.submission.stages}
              title={data.submission.title}
              subtitle={data.submission.subtitle}
              onComplete={() => setCurrentStep('results')}
            />
          )}

          {/* VIEW 5: 86% Results with Cognitive Domains Breakdown */}
          {currentStep === 'results' && (
            <V2ScreeningResults
              resultsData={resultsData || data.results}
              onViewDetailedReport={() => setCurrentStep('history-trends')}
            />
          )}

          {/* VIEW 6: Screening History & 86% Progress Trend Line Chart */}
          {currentStep === 'history-trends' && (
            <V2HistoryTrends
              historyData={data.historyAndTrends}
              onRetake={() => {
                resetScreening();
              }}
            />
          )}
        </div>
      ) : (
        <div>
          {subpageStep === 1 && (
            <Sub1Overview
              onStart={() => setSubpageStep(2)}
              onViewHistory={() => setSubpageStep(9)}
            />
          )}
          {subpageStep === 2 && (
            <Sub2Consent
              onContinue={() => setSubpageStep(3)}
              onCancel={() => setSubpageStep(1)}
            />
          )}
          {subpageStep === 3 && (
            <Sub3Introduction
              onBegin={() => setSubpageStep(4)}
              onBack={() => setSubpageStep(2)}
            />
          )}
          {subpageStep === 4 && (
            <Sub4MCQQuestion
              onNext={() => setSubpageStep(5)}
              onPrevious={() => setSubpageStep(3)}
            />
          )}
          {subpageStep === 5 && (
            <Sub5MemoryQuestion
              onNext={() => setSubpageStep(6)}
              onPrevious={() => setSubpageStep(4)}
            />
          )}
          {subpageStep === 6 && (
            <Sub6ReviewAnswers
              onSubmit={() => setSubpageStep(7)}
              onBackToEdit={() => setSubpageStep(4)}
            />
          )}
          {subpageStep === 7 && (
            <Sub7SubmissionProcessing
              onComplete={() => setSubpageStep(8)}
              onDone={() => setSubpageStep(8)}
            />
          )}
          {subpageStep === 8 && (
            <Sub8ScreeningResults
              onViewDetails={() => setSubpageStep(10)}
              onBackToDashboard={() => setSubpageStep(1)}
            />
          )}
          {subpageStep === 9 && (
            <Sub9ScreeningHistory
              onViewSession={() => setSubpageStep(10)}
              onViewTrends={() => setSubpageStep(10)}
              onViewDetails={() => setSubpageStep(10)}
            />
          )}
          {subpageStep === 10 && (
            <Sub10DetailedTrends
              onBackToHistory={() => setSubpageStep(9)}
              onRetakeScreening={() => setSubpageStep(1)}
            />
          )}
        </div>
      )}
    </div>
  );
}
