'use client';

import React from 'react';
import ResultsTopStats from '../components/ResultsTopStats';
import ScreeningTrendChart from '../components/ScreeningTrendChart';
import ScoreSummaryGauge from '../components/ScoreSummaryGauge';
import CognitiveDomainBreakdown from '../components/CognitiveDomainBreakdown';
import { useResults } from '../hooks/useResults';

export default function ResultsScreen() {
  const { data, timeframe, handleDownloadPdf } = useResults();

  if (!data) return null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Title & Timeframe Selector matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a3832] dark:text-white tracking-tight">
            Results & Trends
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-0.5">
            Track your progress over time.
          </p>
        </div>

        {/* Timeframe Dropdown */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-white dark:bg-[#0c2b24] border border-gray-200 dark:border-[#154c40] px-3.5 py-2 rounded-xl shadow-2xs self-start sm:self-auto cursor-pointer">
          <span>{timeframe}</span>
          <span className="text-[10px] text-gray-400">▾</span>
        </div>
      </div>

      {/* Row 1: 3 Quick Metric Cards (Latest Score 26/30, Stable Trend, 3 Total Tests) */}
      <ResultsTopStats stats={data.stats} />

      {/* Row 2: 2 Columns -> Screening Trend Line Chart & 87% Score Summary Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-8">
          <ScreeningTrendChart
            points={data.trendChart.points}
            protocolLabel={data.trendChart.protocolLabel}
          />
        </div>

        <div className="lg:col-span-4">
          <ScoreSummaryGauge
            percentage={data.stats.performancePercent}
            summary={data.stats.performanceSummary}
          />
        </div>
      </div>

      {/* Row 3: Cognitive Domain Breakdown (Memory, Executive, Attention, Language, Visuospatial, Orientation) */}
      <CognitiveDomainBreakdown
        domains={data.domainBreakdown}
        onDownloadPdf={handleDownloadPdf}
      />
    </div>
  );
}

