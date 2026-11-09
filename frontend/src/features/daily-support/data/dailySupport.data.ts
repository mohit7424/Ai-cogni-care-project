import type {
  DailySupportOverviewData,
  ActivityCardItem,
  CompletedActivityResult,
  MatchingCardTile,
  LogicPuzzleQuestion,
  WordRecallChallenge,
  PatternRecognitionChallenge,
  NumberSeriesChallenge,
  FocusExerciseChallenge,
} from '../types/dailySupport.types';

export const mockDailySupportOverview: DailySupportOverviewData = {
  greetingName: 'Alex',
  greetingMessage: "Let's do something great for your mind today.",
  dailyGoalPercent: 70,
  dailyGoals: [
    { id: 'g-1', label: 'Complete 1 activity', completed: true },
    { id: 'g-2', label: 'Take your medication', completed: false },
    { id: 'g-3', label: 'Stay mentally active', completed: false },
  ],
  categories: [
    { id: 'cat-1', name: 'Memory', subtext: 'Boost your memory', icon: '🧠' },
    { id: 'cat-2', name: 'Attention', subtext: 'Improve focus', icon: '🎯' },
    { id: 'cat-3', name: 'Logic', subtext: 'Enhance reasoning', icon: '🧩' },
    { id: 'cat-4', name: 'Language', subtext: 'Build communication', icon: '📖' },
  ],
  recommendedActivity: {
    id: 'act-1',
    title: 'Memory Matching',
    subtitle: 'Match the pairs of images',
    duration: '5 min',
    bgImage: '🏔️',
  },
};

export const mockActivityLibrary: ActivityCardItem[] = [
  {
    id: 'act-1',
    title: 'Memory Matching',
    subtitle: 'Match the pairs',
    category: 'Memory',
    duration: '5 min',
    difficulty: 'Easy',
    icon: '🍎',
  },
  {
    id: 'act-2',
    title: 'Logic Puzzle',
    subtitle: 'Solve the puzzle',
    category: 'Reasoning',
    duration: '7 min',
    difficulty: 'Medium',
    icon: '🧩',
  },
  {
    id: 'act-3',
    title: 'Word Recall',
    subtitle: 'Remember the words',
    category: 'Language',
    duration: '5 min',
    difficulty: 'Easy',
    icon: '🔤',
  },
  {
    id: 'act-4',
    title: 'Pattern Recognition',
    subtitle: 'Find the pattern',
    category: 'Attention',
    duration: '6 min',
    difficulty: 'Medium',
    icon: '🔷',
  },
  {
    id: 'act-5',
    title: 'Number Series',
    subtitle: 'Complete the sequence',
    category: 'Reasoning',
    duration: '6 min',
    difficulty: 'Hard',
    icon: '🔢',
  },
  {
    id: 'act-6',
    title: 'Focus Exercise',
    subtitle: 'Improve concentration',
    category: 'Focus',
    duration: '5 min',
    difficulty: 'Easy',
    icon: '🧠',
  },
];

// Activity 1: Memory Matching Tiles
export const mockMatchingCards: MatchingCardTile[] = [
  { id: 'c-1', pairId: 1, symbol: '🌳', revealed: true, matched: false },
  { id: 'c-2', pairId: 2, symbol: '🧠', revealed: false, matched: false },
  { id: 'c-3', pairId: 3, symbol: '⭐', revealed: true, matched: false },
  { id: 'c-4', pairId: 2, symbol: '🧠', revealed: false, matched: false },
  { id: 'c-5', pairId: 4, symbol: '🍎', revealed: true, matched: false },
  { id: 'c-6', pairId: 4, symbol: '🧠', revealed: false, matched: false },
];

// Activity 2: Logic Puzzle Questions
export const mockLogicPuzzles: LogicPuzzleQuestion[] = [
  {
    id: 'lp-1',
    title: 'Deductive Syllogism',
    description:
      'All carnations are flowers. Some flowers fade in 3 days. None of the persistent plants fade in 3 days. Which statement MUST be true?',
    options: [
      'Some carnations might not be persistent plants',
      'All flowers are carnations',
      'Carnations never fade in 3 days',
      'Persistent plants are always flowers',
    ],
    correctAnswer: 'Some carnations might not be persistent plants',
    explanation:
      'Because some flowers fade in 3 days and persistent plants never do, any flower that fades cannot be a persistent plant.',
    hint: 'Focus on the relationship between plants that fade and persistent plants.',
  },
  {
    id: 'lp-2',
    title: 'Seating Arrangement Deduction',
    description:
      'Four colleagues (A, B, C, D) sit in a straight row. B is next to C but not D. A is at the far left. Who must be sitting at the far right?',
    options: ['D', 'B', 'C', 'Cannot be determined'],
    correctAnswer: 'D',
    explanation: 'From left to right: A sits at position 1. B and C take positions 2 and 3. D must be at position 4.',
    hint: 'Place A first at position 1, then pair B and C together.',
  },
  {
    id: 'lp-3',
    title: 'Balance Scale Logic',
    description:
      'If 2 Circles = 1 Triangle, and 1 Triangle = 3 Squares, how many Squares are needed to balance 4 Circles?',
    options: ['6 Squares', '4 Squares', '8 Squares', '3 Squares'],
    correctAnswer: '6 Squares',
    explanation: '4 Circles = 2 Triangles. Since 1 Triangle = 3 Squares, 2 Triangles = 6 Squares.',
    hint: 'Convert Circles into Triangles first, then into Squares.',
  },
];

// Activity 3: Word Recall Challenge
export const mockWordRecallChallenges: WordRecallChallenge[] = [
  {
    id: 'wr-1',
    title: 'Word Memorization - Nature & Living',
    studyWords: ['River', 'Garden', 'Castle', 'Silver', 'Breeze'],
    studySeconds: 15,
    recallOptions: [
      { word: 'River', isCorrect: true },
      { word: 'Ocean', isCorrect: false },
      { word: 'Garden', isCorrect: true },
      { word: 'Mountain', isCorrect: false },
      { word: 'Castle', isCorrect: true },
      { word: 'Silver', isCorrect: true },
      { word: 'Golden', isCorrect: false },
      { word: 'Breeze', isCorrect: true },
    ],
    hint: 'Form a mental scene connecting the river, garden, and castle.',
  },
  {
    id: 'wr-2',
    title: 'Word Memorization - Objects & Materials',
    studyWords: ['Lantern', 'Velvet', 'Compass', 'Marble', 'Anchor'],
    studySeconds: 15,
    recallOptions: [
      { word: 'Lantern', isCorrect: true },
      { word: 'Candle', isCorrect: false },
      { word: 'Velvet', isCorrect: true },
      { word: 'Compass', isCorrect: true },
      { word: 'Clock', isCorrect: false },
      { word: 'Marble', isCorrect: true },
      { word: 'Stone', isCorrect: false },
      { word: 'Anchor', isCorrect: true },
    ],
    hint: 'Visualize an antique captain’s desk with these objects.',
  },
];

// Activity 4: Pattern Recognition Challenges
export const mockPatternRecognitionChallenges: PatternRecognitionChallenge[] = [
  {
    id: 'pr-1',
    title: 'Geometric Side Expansion',
    sequence: ['▲ (3 sides)', '◆ (4 sides)', '⬟ (5 sides)', '?'],
    options: ['⬢ Hexagon (6 sides)', '● Circle', '★ Star', '▲ Triangle'],
    correctAnswer: '⬢ Hexagon (6 sides)',
    explanation: 'Each subsequent geometric shape increases its side count by 1 (3 -> 4 -> 5 -> 6).',
    hint: 'Count the vertices or straight edges of each shape in order.',
  },
  {
    id: 'pr-2',
    title: 'Rotational Symmetry Shift',
    sequence: ['⬆️ North', '➡️ East', '⬇️ South', '?'],
    options: ['⬅️ West', '↗️ North-East', '⬆️ North', '🔄 Spin'],
    correctAnswer: '⬅️ West',
    explanation: 'Clockwise rotation by 90 degrees at each step: N (0°) -> E (90°) -> S (180°) -> W (270°).',
    hint: 'Follow the hands of a clock turning 90 degrees clockwise.',
  },
  {
    id: 'pr-3',
    title: 'Alternating Color & Shape Matrix',
    sequence: ['🔵 Blue Circle', '🟩 Green Square', '🔵 Blue Circle', '🟩 Green Square', '?'],
    options: ['🔵 Blue Circle', '🟩 Green Square', '🔴 Red Triangle', '🟡 Yellow Star'],
    correctAnswer: '🔵 Blue Circle',
    explanation: 'Strict alternating two-state pattern (A -> B -> A -> B -> A).',
    hint: 'Notice the two elements taking turns.',
  },
];

// Activity 5: Number Series Challenges
export const mockNumberSeriesChallenges: NumberSeriesChallenge[] = [
  {
    id: 'ns-1',
    title: 'Alternating Step Progression',
    sequence: ['7', '3', '9', '5', '11', '?'],
    options: ['7', '8', '13', '6'],
    correctAnswer: '7',
    explanation: 'Alternating operators: -4, +6, -4, +6, -4. (11 - 4 = 7).',
    hint: 'Look at the jump from 7 to 3 (-4) and from 3 to 9 (+6).',
  },
  {
    id: 'ns-2',
    title: 'Geometric Multiplier Sequence',
    sequence: ['2', '6', '18', '54', '?'],
    options: ['162', '108', '148', '216'],
    correctAnswer: '162',
    explanation: 'Each term is multiplied by 3 (2x3=6, 6x3=18, 18x3=54, 54x3=162).',
    hint: 'Check the ratio between consecutive numbers.',
  },
  {
    id: 'ns-3',
    title: 'Fibonacci Additive Sequence',
    sequence: ['1', '1', '2', '3', '5', '8', '?'],
    options: ['13', '11', '12', '16'],
    correctAnswer: '13',
    explanation: 'Each number is the sum of the preceding two numbers (5 + 8 = 13).',
    hint: 'Add 5 and 8 together.',
  },
];

// Activity 6: Focus Exercise Challenges
export const mockFocusExerciseChallenges: FocusExerciseChallenge[] = [
  {
    id: 'fe-1',
    title: 'Target Symbol Spotting',
    targetSymbol: '🎯',
    gridSymbols: [
      '🎪', '🎯', '🎨', '🎪',
      '🎭', '🎪', '🎯', '🎨',
      '🎯', '🎨', '🎭', '🎪',
      '🎨', '🎯', '🎪', '🎭',
    ],
    targetCount: 4,
    timeLimitSeconds: 20,
    hint: 'Scan row by row to find all the bullseye target symbols.',
  },
  {
    id: 'fe-2',
    title: 'Mental Clarity & Selective Attention',
    targetSymbol: '🧠',
    gridSymbols: [
      '💡', '🧠', '⚡', '💡',
      '⚡', '💡', '🧠', '⚡',
      '🧠', '⚡', '💡', '🧠',
      '💡', '🧠', '⚡', '💡',
    ],
    targetCount: 5,
    timeLimitSeconds: 20,
    hint: 'Focus only on the brain icons while filtering out the lightbulbs and bolts.',
  },
];

// Customized Completion Result for Each Activity
export const mockCompletedResultsMap: Record<string, CompletedActivityResult> = {
  'act-1': {
    scorePercent: 85,
    timeTaken: '04 min 28 sec',
    activityTitle: 'Memory Matching',
    progressPercentBonus: '+10%',
    progressChartBars: [30, 45, 55, 60, 70, 80, 85, 95],
    nextRecommendedTitle: 'Logic Puzzle',
    nextRecommendedDesc: 'Enhance your reasoning skills.',
  },
  'act-2': {
    scorePercent: 92,
    timeTaken: '05 min 40 sec',
    activityTitle: 'Logic Puzzle',
    progressPercentBonus: '+12%',
    progressChartBars: [35, 50, 60, 75, 82, 88, 92, 98],
    nextRecommendedTitle: 'Pattern Recognition',
    nextRecommendedDesc: 'Train your visual perception and symmetry deduction.',
  },
  'act-3': {
    scorePercent: 90,
    timeTaken: '03 min 50 sec',
    activityTitle: 'Word Recall',
    progressPercentBonus: '+8%',
    progressChartBars: [40, 50, 65, 70, 78, 85, 90, 95],
    nextRecommendedTitle: 'Number Series',
    nextRecommendedDesc: 'Test your sequential calculation abilities.',
  },
  'act-4': {
    scorePercent: 88,
    timeTaken: '04 min 15 sec',
    activityTitle: 'Pattern Recognition',
    progressPercentBonus: '+10%',
    progressChartBars: [30, 42, 55, 68, 74, 82, 88, 94],
    nextRecommendedTitle: 'Focus Exercise',
    nextRecommendedDesc: 'Boost your selective visual attention.',
  },
  'act-5': {
    scorePercent: 84,
    timeTaken: '05 min 10 sec',
    activityTitle: 'Number Series',
    progressPercentBonus: '+11%',
    progressChartBars: [25, 40, 52, 64, 72, 80, 84, 92],
    nextRecommendedTitle: 'Memory Matching',
    nextRecommendedDesc: 'Re-train your short-term visual recall.',
  },
  'act-6': {
    scorePercent: 95,
    timeTaken: '03 min 20 sec',
    activityTitle: 'Focus Exercise',
    progressPercentBonus: '+15%',
    progressChartBars: [50, 60, 70, 80, 85, 90, 95, 100],
    nextRecommendedTitle: 'Word Recall',
    nextRecommendedDesc: 'Exercise your linguistic memory pathways.',
  },
};

export const mockCompletedResult: CompletedActivityResult = mockCompletedResultsMap['act-1'];
