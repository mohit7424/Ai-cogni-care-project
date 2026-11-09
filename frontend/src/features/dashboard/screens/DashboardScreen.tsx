'use client';

import React from 'react';
import GreetingBanner from '../components/GreetingBanner';
import NextStepCard from '../components/NextStepCard';
import ProgressChartCard from '../components/ProgressChartCard';
import BottomWidgets from '../components/BottomWidgets';
import { useDashboard } from '../hooks/useDashboard';

export default function DashboardScreen() {
  const { data, handleStartScreening } = useDashboard();

  return (
    <div className="space-y-5">
      {/* Top Greeting & Stats Pill Banner */}
      <GreetingBanner
        name={data?.patientName?.split(' ')[0] ?? 'Alex'}
        greeting={data?.greetingTime ?? 'Good morning'}
        stats={data?.stats}
      />

      {/* Middle 2-Column Section: Next Step Card & Progress Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Cognitive Screening Next Step */}
        <div className="lg:col-span-5">
          <NextStepCard
            step={data?.nextStep}
            onStart={handleStartScreening}
          />
        </div>

        {/* Progress Overview Chart */}
        <div className="lg:col-span-7">
          <ProgressChartCard
            timeframe={data?.progressChart?.timeframe}
            points={data?.progressChart?.points}
            improvementRate={data?.progressChart?.improvementRate}
            statusSummary={data?.progressChart?.statusSummary}
          />
        </div>
      </div>

      {/* Bottom 2 Widgets: Upcoming Activities & Medication Reminder */}
      <BottomWidgets
        activity={data?.upcomingActivity}
        medication={data?.medicationReminder}
        onViewActivity={() => alert('Opening Upcoming Activities...')}
        onViewMedication={() => alert('Opening Medication Schedule...')}
      />
    </div>
  );
}
