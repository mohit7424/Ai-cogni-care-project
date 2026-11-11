'use client';

import React from 'react';
import { useDoctor } from '../hooks/useDoctor';

export default function DoctorCarePlansScreen() {
  const { data } = useDoctor();

  if (!data) return null;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a3832] dark:text-white tracking-tight">
            Clinician-Authored Care Plans
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Prescribed cognitive wellness goals, lifestyle interventions, and follow-up schedules
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('New care plan builder opening...')}
          className="px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8075] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
        >
          + Create Care Plan
        </button>
      </div>

      <div className="space-y-4">
        {data.carePlans.map(cp => (
          <div
            key={cp.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#0c2b24] border border-teal-100/80 dark:border-[#154c40] space-y-4 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100 dark:border-[#154c40]">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Patient</span>
                <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                  {cp.patientName} <span className="font-mono text-xs text-gray-400 font-normal">({cp.patientCode})</span>
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {cp.status}
                </span>
                <span className="text-xs text-gray-400">
                  Review: <strong>{cp.reviewDate}</strong>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-2">
                <h4 className="font-extrabold text-teal-800 dark:text-teal-300">Measurable Goals</h4>
                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                  {cp.goals.map((g, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#0d9488]">✓</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-teal-800 dark:text-teal-300">Clinical Recommendations</h4>
                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                  {cp.recommendations.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-500">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-[#154c40]">
              <h4 className="text-xs font-bold text-gray-800 dark:text-white mb-2">Prescribed Tasks</h4>
              <div className="flex flex-wrap gap-2">
                {cp.tasks.map((t, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-xl bg-gray-50 dark:bg-[#071f1a] border border-gray-100 dark:border-[#154c40] text-xs flex items-center gap-2"
                  >
                    <span className={t.completed ? 'text-emerald-500 font-bold' : 'text-gray-400'}>
                      {t.completed ? '✓' : '○'}
                    </span>
                    <span className="text-gray-700 dark:text-gray-200">{t.title}</span>
                    <span className="text-[10px] text-gray-400 font-mono">({t.due})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

