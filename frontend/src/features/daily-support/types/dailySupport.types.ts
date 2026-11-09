export type DailySupportView =
  | 'overview'       // View 1: Daily Support Overview & Goals
  | 'library'        // View 2: Cognitive Activity Library (Filter tabs: All, Memory, Attention...)
  | 'game-exercise'  // View 3: Active Activity Interactive Game/Exercise
  | 'completed';     // View 4: Activity Completed summary & Next Recommendation

export type ActivityCategory =
  | 'All'
  | 'Memory'
  | 'Attention'
  | 'Language'
  | 'Reasoning'
  | 'Focus';

export interface ActivityCardItem {
  id: string;
  title: string;
  subtitle: string;
  category: ActivityCategory;
  duration: string; // e.g. "5 min"
  difficulty: 'Easy' | 'Medium' | 'Hard';
  icon: string;
  iconBg?: string;
}

export interface SupportCategoryItem {
  id: string;
  name: string;
  subtext: string;
  icon: string;
}

export interface DailyGoalItem {
  id: string;
  label: string;
  completed: boolean;
}

export interface DailySupportOverviewData {
  greetingName: string;
  greetingMessage: string;
  dailyGoalPercent: number;
  dailyGoals: DailyGoalItem[];
  categories: SupportCategoryItem[];
  recommendedActivity: {
    id: string;
    title: string;
    subtitle: string;
    duration: string;
    bgImage?: string;
  };
}

export interface CompletedActivityResult {
  scorePercent: number;
  timeTaken: string;
  activityTitle: string;
  progressPercentBonus: string;
  progressChartBars: number[];
  nextRecommendedTitle: string;
  nextRecommendedDesc: string;
}

export interface MatchingCardTile {
  id: string;
  pairId: number;
  symbol: string;
  revealed: boolean;
  matched: boolean;
}

export interface LogicPuzzleQuestion {
  id: string;
  title: string;
  description: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
}

export interface WordRecallChallenge {
  id: string;
  title: string;
  studyWords: string[];
  studySeconds: number;
  recallOptions: { word: string; isCorrect: boolean }[];
  hint: string;
}

export interface PatternRecognitionChallenge {
  id: string;
  title: string;
  sequence: string[];
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
}

export interface NumberSeriesChallenge {
  id: string;
  title: string;
  sequence: string[];
  options: string[];
  correctAnswer: string;
  ruleExplanation: string;
  hint: string;
}

export interface FocusExerciseChallenge {
  id: string;
  title: string;
  targetSymbol: string;
  gridSymbols: string[];
  targetCount: number;
  timeLimitSeconds: number;
  hint: string;
}
