'use client';

import React from 'react';
import type { PreparationGuideline } from '../types/screening.types';

interface GuidelinesProps {
  guidelines?: PreparationGuideline[];
}

export default function PreparationGuidelines({
  guidelines = [
    {
      key: 'A',
      title: 'Quiet Environment',
      description:
        'Find a comfortable space free from television, loud audio, or interruptions.',
    },
    {
      key: 'B',
      title: 'Audio & Screen Ready',
      description:
        'Turn on your device sound to hear word pair recalls or use earphones for clarity.',
    },
    {
      key: 'C',
      title: 'Work Independently',
      description:
        'Complete answers without caregiver hints so your health report remains accurate.',
    },
  ],
}: GuidelinesProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[#0d9488] text-base">⚠️</span>
            <h3 className="text-sm font-bold text-gray-800">Preparation Guidelines</h3>
          </div>
          <span className="text-[10px] font-bold text-gray-400">3 simple rules</span>
        </div>

        <div className="space-y-4">
          {guidelines.map(rule => (
            <div key={rule.key} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-lg bg-teal-50 text-[#0d9488] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {rule.key}
              </span>
              <div>
                <h4 className="text-xs font-bold text-gray-800 leading-tight">
                  {rule.title}
                </h4>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                  {rule.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

