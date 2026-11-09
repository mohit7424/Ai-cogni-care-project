'use client';

import React from 'react';
import type { ScreeningStep } from '../types/screening.types';

interface StepperProps {
  currentStep?: ScreeningStep;
  onStepClick?: (step: ScreeningStep) => void;
}

const steps = [
  { id: 'introduction', number: 1, label: 'Introduction' },
  { id: 'questions', number: 2, label: 'Questions' },
  { id: 'review', number: 3, label: 'Review' },
  { id: 'results', number: 4, label: 'Results' },
];

export default function ScreeningStepper({
  currentStep = 'introduction',
  onStepClick,
}: StepperProps) {
  const currentIdx = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-2xs">
      <div className="flex items-center justify-between max-w-2xl mx-auto px-4">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentIdx;
          const isCurrent = idx === currentIdx;

          return (
            <React.Fragment key={step.id}>
              {/* Step item */}
              <button
                type="button"
                onClick={() => onStepClick?.(step.id as ScreeningStep)}
                className="flex flex-col items-center gap-1.5 focus:outline-none group cursor-pointer"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                    isCurrent
                      ? 'bg-[#0d9488] text-white ring-4 ring-teal-100 shadow-sm'
                      : isCompleted
                      ? 'bg-[#0d9488] text-white'
                      : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                  }`}
                >
                  {isCompleted ? '✓' : step.number}
                </div>
                <span
                  className={`text-[11px] font-semibold transition ${
                    isCurrent ? 'text-[#0d9488]' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
                {isCurrent && <div className="h-0.5 w-8 bg-[#0d9488] rounded-full mt-0.5" />}
              </button>

              {/* Connecting line between steps */}
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-3 transition ${
                    idx < currentIdx ? 'bg-[#0d9488]' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

