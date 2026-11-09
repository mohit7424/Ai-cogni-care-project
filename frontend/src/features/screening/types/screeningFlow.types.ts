export type ScreeningSubPage =
  | 'overview'            // 1. Screening Overview
  | 'consent'             // 2. Consent & Preparation
  | 'intro'               // 3. Screening Introduction
  | 'mcq-question'        // 4. Question Page - MCQ
  | 'memory-question'     // 5. Question Page - Memory Recall
  | 'review'              // 6. Review Answers
  | 'submitting'          // 7. Submission / Processing
  | 'results'             // 8. Screening Results
  | 'history'             // 9. Screening History
  | 'trends';             // 10. Detailed Result & Trends

export interface ReviewAnswerItem {
  id: string;
  questionNumber: number;
  questionText: string;
  userAnswer: string;
}

export interface ScreeningSessionHistory {
  id: string;
  date: string;
  score: number;
  status: 'Normal' | 'Watch' | 'Review';
}

export interface TrendPoint {
  month: string;
  score: number;
}

