export interface V2QuestionData {
  id: string;
  category: string;
  title: string;
  questionNumber: number;
  totalQuestions: number;
  sequence: string[];
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface V2MemoryRecallItem {
  id: string;
  label: string;
  icon: string;
}

export interface V2ReviewSectionItem {
  id: string;
  title: string;
  score: string;
  correctCount: number;
  totalCount: number;
  status: 'passed' | 'review';
}

export interface V2SubmissionStageItem {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'completed';
}

export interface V2CognitiveDomainScore {
  name: string;
  score: string;
  percentage: number;
  width: string;
}

export interface V2ScreeningResultData {
  overallScore: number;
  performanceBadge: string;
  disclaimer: string;
  domains: V2CognitiveDomainScore[];
}

export interface V2HistorySessionItem {
  id: string;
  date: string;
  score: string;
  scoreValue: number;
  status: 'Good' | 'Fair' | 'Watch';
  statusBg: string;
}

export interface V2TrendDataPoint {
  month: string;
  score: number;
}

export interface V2ScreeningData {
  initialTimer: string;
  questions: V2QuestionData[];
  memoryRecall: {
    instruction: string;
    studyTimeSeconds: number;
    items: V2MemoryRecallItem[];
  };
  review: {
    title: string;
    subtitle: string;
    totalTimeFormatted: string;
    sections: V2ReviewSectionItem[];
  };
  submission: {
    title: string;
    subtitle: string;
    stages: V2SubmissionStageItem[];
  };
  results: V2ScreeningResultData;
  historyAndTrends: {
    timeframe: string;
    sessions: V2HistorySessionItem[];
    trendPoints: V2TrendDataPoint[];
    motivationalTip: string;
  };
}

