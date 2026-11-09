export type ScreeningStep = 'introduction' | 'questions' | 'review' | 'results';

export interface ScreeningHistoryItem {
  id: string;
  month: string;
  day: string;
  protocolName: string;
  score: number;
  totalScore: number;
  status: 'Normal Range' | 'Needs Attention' | 'Borderline';
  summary: string;
  pdfUrl?: string;
}

export interface PreparationGuideline {
  key: string;
  title: string;
  description: string;
}

export interface ScreeningOverview {
  title: string;
  subtitle: string;
  protocol: string;
  badge: string;
  heading: string;
  description: string;
  highlights: string[];
  guidelines: PreparationGuideline[];
  history: ScreeningHistoryItem[];
}

export interface QuestionOption {
  id: string;
  label: string;
}

export interface ScreeningQuestion {
  id: string;
  category: 'Memory Recall' | 'Visuospatial' | 'Executive Focus' | 'Orientation' | 'Language';
  title: string;
  instruction: string;
  audioPrompt?: string;
  options: QuestionOption[];
}

export interface ScreeningResultCategory {
  name: string;
  score: number;
  maxScore: number;
  status: 'optimal' | 'good' | 'monitor';
}

export interface FinalScreeningResult {
  totalScore: number;
  maxScore: number;
  clinicalRange: 'Normal Range' | 'Mild Cognitive Impairment' | 'Consult Specialist';
  dateCompleted: string;
  reviewedBy: string;
  summary: string;
  breakdown: ScreeningResultCategory[];
  recommendations: string[];
}
