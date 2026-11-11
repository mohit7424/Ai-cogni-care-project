'use client';

import React from 'react';
import { useDoctor } from '../hooks/useDoctor';
import { CognitiveCohortChartCard } from '../components';

export default function DoctorAnalyticsScreen() {
  const { data } = useDoctor();

  if (!data) return null;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a3832] dark:text-white tracking-tight">
          Doctor Clinical Workload &amp; Population Analytics
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Aggregate cohort metrics, review completion velocity, and cognitive distribution
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#0c2b24] border border-teal-100/80 dark:border-[#154c40] space-y-2">
          <span className="text-[10px] text-gray-400 font-bold uppercase">Average Review Turnaround</span>
          <h3 className="text-3xl font-black text-[#0a3832] dark:text-teal-200">2.4 hrs</h3>
          <p className="text-xs text-emerald-600 font-semibold">↑ 18% faster than clinic benchmark</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#0c2b24] border border-teal-100/80 dark:border-[#154c40] space-y-2">
          <span className="text-[10px] text-gray-400 font-bold uppercase">Patient Adherence Rate</span>
          <h3 className="text-3xl font-black text-[#0a3832] dark:text-teal-200">89%</h3>
          <p className="text-xs text-teal-700 dark:text-teal-300 font-semibold">Active weekly screening compliance</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#0c2b24] border border-teal-100/80 dark:border-[#154c40] space-y-2">
          <span className="text-[10px] text-gray-400 font-bold uppercase">Monthly Reviews Completed</span>
          <h3 className="text-3xl font-black text-[#0a3832] dark:text-teal-200">42</h3>
          <p className="text-xs text-gray-500">Across 36 active neurology cases</p>
        </div>
      </div>

      <CognitiveCohortChartCard
        cohort={data.cohortDistribution}
        totalPatients={data.summaryStats.totalAssigned}
      />
    </div>
  );
}

