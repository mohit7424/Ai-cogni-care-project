export interface ResultsSummaryStats {
  latestScore: number;
  totalScoreMax: number;
  scoreStatus: 'Normal Range' | 'Borderline' | 'Needs Attention';
  trendStatus: 'Stable' | 'Improving' | 'Declining';
  trendSubtext: string;
  totalTestsCount: number;
  totalTestsSubtext: string;
  performancePercent: number;
  performanceSummary: string;
}

export interface ScreeningTrendPoint {
  month: string;
  score: number;
}

export interface DomainBreakdownItem {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  subtext: string;
  tag: 'Optimal' | 'Normal' | 'Monitor';
}

export interface ResultsTrendsData {
  timeframe: string;
  stats: ResultsSummaryStats;
  trendChart: {
    protocolLabel: string;
    points: ScreeningTrendPoint[];
  };
  domainBreakdown: DomainBreakdownItem[];
}

