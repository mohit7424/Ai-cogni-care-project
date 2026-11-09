import type { ResultsTrendsData } from '../types/results.types';

export const mockResultsData: ResultsTrendsData = {
  timeframe: 'Last 6 Months',
  stats: {
    latestScore: 26,
    totalScoreMax: 30,
    scoreStatus: 'Normal Range',
    trendStatus: 'Stable',
    trendSubtext: '+2 pts this period',
    totalTestsCount: 3,
    totalTestsSubtext: 'Verified clinical records',
    performancePercent: 87,
    performanceSummary:
      'Your scores are within the normal range. Continue your daily activities.',
  },
  trendChart: {
    protocolLabel: 'MoCA Score',
    points: [
      { month: 'May', score: 24 },
      { month: 'Jun', score: 26 },
      { month: 'Jul', score: 26 },
      { month: 'Aug', score: 27 },
      { month: 'Sep', score: 27 },
      { month: 'Oct', score: 28 },
    ],
  },
  domainBreakdown: [
    {
      name: 'Memory Recall',
      score: 5,
      maxScore: 5,
      percentage: 100,
      subtext: 'Delayed recall score',
      tag: 'Optimal',
    },
    {
      name: 'Executive Function',
      score: 4,
      maxScore: 5,
      percentage: 80,
      subtext: 'Trail making & clock test',
      tag: 'Normal',
    },
    {
      name: 'Attention & Calculation',
      score: 5,
      maxScore: 6,
      percentage: 83,
      subtext: 'Digit span & serial subtraction',
      tag: 'Normal',
    },
    {
      name: 'Language Fluency',
      score: 3,
      maxScore: 3,
      percentage: 100,
      subtext: 'Naming and sentence repetition',
      tag: 'Optimal',
    },
    {
      name: 'Visuospatial Ability',
      score: 4,
      maxScore: 5,
      percentage: 80,
      subtext: 'Cube & contour replication',
      tag: 'Normal',
    },
    {
      name: 'Orientation',
      score: 5,
      maxScore: 6,
      percentage: 83,
      subtext: 'Time and spatial orientation',
      tag: 'Normal',
    },
  ],
};

export const mockResultsTrendsData = mockResultsData;

