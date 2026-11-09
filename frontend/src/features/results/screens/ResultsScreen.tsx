'use client';

import React from 'react';
import ResultsTopStats from '../components/ResultsTopStats';
import ScreeningTrendChart from '../components/ScreeningTrendChart';
import ScoreSummaryGauge from '../components/ScoreSummaryGauge';
import CognitiveDomainBreakdown from '../components/CognitiveDomainBreakdown';
import { useResults } from '../hooks/useResults';

export default function ResultsScreen() {
  const { data, timeframe, setTimeframe, handleDownloadPdf } = useResults();

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Top Title & Timeframe Selector matching screenshot */}
      <div className="flex items-center justify-between pb-1">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Results & Trends
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Track your progress over time.
          </p>
        </div>

        {/* Timeframe Dropdown */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-2xs cursor-pointer">
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

