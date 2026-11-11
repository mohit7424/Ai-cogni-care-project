'use client';

import React from 'react';
import { useDoctor } from '../hooks/useDoctor';

export default function DoctorMonitoringScreen() {
  const { data } = useDoctor();

  if (!data) return null;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a3832] dark:text-white tracking-tight">
          Longitudinal Patient Cognitive Monitoring
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Multi-month score trajectories, domain variance tracking, and threshold review flags
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.patientsList.map(pat => (
          <div
            key={pat.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#0c2b24] border border-teal-100/80 dark:border-[#154c40] space-y-4 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">
                  {pat.name} <span className="font-mono text-xs text-gray-400 font-normal">({pat.patientCode})</span>
                </h3>
                <p className="text-xs text-gray-500">Age: {pat.age} yrs • Assigned: {pat.assignedDate}</p>
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  pat.hasAttentionFlag
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                {pat.hasAttentionFlag ? 'Attention Flagged' : 'Stable Trajectory'}
              </span>
            </div>

            {pat.latestMmseScore && (
              <div className="p-3.5 rounded-2xl bg-[#f8fcfa] dark:bg-[#071f1a] border border-gray-100 dark:border-[#154c40] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Latest Score</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-[#0a3832] dark:text-white">
                      {pat.latestMmseScore.score}/{pat.latestMmseScore.total}
                    </span>
                    <span className="text-xs font-semibold text-teal-700 dark:text-teal-300">
                      ({pat.latestMmseScore.clinicalRange})
                    </span>
                  </div>
                </div>

                <div className="text-right text-[11px] text-gray-500">
                  <span>Next Checkpoint:</span>
                  <p className="font-bold text-[#0d9488]">{pat.nextFollowUpDate}</p>
                </div>
              </div>
            )}

            {pat.attentionReason && (
              <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                ⚠ {pat.attentionReason}
              </p>
            )}

            <div className="pt-2 flex items-center justify-end">
              <button
                type="button"
                onClick={() => alert(`Opening longitudinal trend chart for ${pat.name}...`)}
                className="text-xs font-bold text-[#0d9488] hover:underline"
              >
                Inspect 12-Month Wave &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

