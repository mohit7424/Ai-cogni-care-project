import type {
  ScreeningOverview,
  ScreeningQuestion,
  FinalScreeningResult,
} from '../types/screening.types';
import type { V2ScreeningData } from '../types/v2Screening.types';

export const mockScreeningOverview: ScreeningOverview = {
  title: 'Cognitive Screening',
  subtitle: 'A quick and easy test to check your cognitive health.',
  protocol: 'MoCA Standard (10 Min)',
  badge: 'Quarterly Routine Test',
  heading: 'Welcome to Cognitive Screening',
  description:
    'This short test will help you track changes in your cognitive health over time. Simple exercises assess memory recall, executive focus, and spatial awareness.',
  highlights: [
    'Takes about 5–10 minutes',
    'Non-diagnostic assessment',
    'Results directly reviewed with your clinician',
  ],
  guidelines: [
    {
      key: 'A',
      title: 'Quiet Environment',
      description:
        'Find a comfortable space free from television, loud audio, or interruptions.',
    },
    {
      key: 'B',
      title: 'Audio & Screen Ready',
      description:
        'Turn on your device sound to hear word pair recalls or use earphones for clarity.',
    },
    {
      key: 'C',
      title: 'Work Independently',
      description:
        'Complete answers without caregiver hints so your health report remains accurate.',
    },
  ],
  history: [
    {
      id: 'sc-1',
      month: 'OCT',
      day: '14',
      protocolName: 'MoCA Clinical Score',
      score: 26,
      totalScore: 30,
      status: 'Normal Range',
      summary: 'Visuospatial & Memory recall improved (+1 pt)',
      pdfUrl: '#',
    },
    {
      id: 'sc-2',
      month: 'AUG',
      day: '10',
      protocolName: 'MoCA Clinical Score',
      score: 25,
      totalScore: 30,
      status: 'Normal Range',
      summary: 'Baseline assessment confirmed stable',
      pdfUrl: '#',
    },
  ],
};

export const mockQuestions: ScreeningQuestion[] = [
  {
    id: 'q-1',
    category: 'Memory Recall',
    title: 'Word Association & Memory Retention',
    instruction:
      'Listen to or read the following list of 5 words: [Velvet, Church, Daisy, Red, Silk]. Which of the following words was NOT in the initial memory set?',
    options: [
      { id: 'opt-1', label: 'Daisy' },
      { id: 'opt-2', label: 'Ocean' },
      { id: 'opt-3', label: 'Velvet' },
      { id: 'opt-4', label: 'Church' },
    ],
  },
  {
    id: 'q-2',
    category: 'Orientation',
    title: 'Time & Orientation Verification',
    instruction:
      'Please identify the correct current day of the week and month accurately without checking a secondary calendar.',
    options: [
      { id: 'opt-1', label: 'Confirm Current Date & Month accurately' },
      { id: 'opt-2', label: 'Off by 1-2 days' },
      { id: 'opt-3', label: 'Unsure of current day/month' },
    ],
  },
  {
    id: 'q-3',
    category: 'Visuospatial',
    title: 'Pattern Recognition & Clock Drawing Representation',
    instruction:
      'In a classic clock face, what is the exact angle formed by the hands pointing to 11:10?',
    options: [
      { id: 'opt-1', label: 'Obtuse Angle (> 90°)' },
      { id: 'opt-2', label: 'Acute Angle (< 90°)' },
      { id: 'opt-3', label: 'Straight Line (180°)' },
      { id: 'opt-4', label: 'Right Angle (90°)' },
    ],
  },
  {
    id: 'q-4',
    category: 'Executive Focus',
    title: 'Serial Subtraction & Concentration',
    instruction:
      'Starting from 100, subtract 7 consecutively: 100 - 7 = 93, 93 - 7 = 86... What is the next number after 86 minus 7?',
    options: [
      { id: 'opt-1', label: '79' },
      { id: 'opt-2', label: '78' },
      { id: 'opt-3', label: '81' },
      { id: 'opt-4', label: '77' },
    ],
  },
  {
    id: 'q-5',
    category: 'Language',
    title: 'Verbal Fluency & Conceptual Abstraction',
    instruction:
      'What common category fundamentally connects an "Orange" and a "Banana"?',
    options: [
      { id: 'opt-1', label: 'Fruit & Edible Foods' },
      { id: 'opt-2', label: 'Color Spectrum' },
      { id: 'opt-3', label: 'Tree Bark Classification' },
    ],
  },
];

export const mockFinalResult: FinalScreeningResult = {
  totalScore: 27,
  maxScore: 30,
  clinicalRange: 'Normal Range',
  dateCompleted: 'Today, 10:45 AM',
  reviewedBy: 'Dr. Sarah Jenkins (Neurology Care)',
  summary:
    'Your cognitive screening indicators demonstrate robust executive functioning, strong spatial reasoning, and stable memory retention compared to your prior quarterly baseline.',
  breakdown: [
    { name: 'Visuospatial & Executive', score: 5, maxScore: 5, status: 'optimal' },
    { name: 'Memory & Delayed Recall', score: 4, maxScore: 5, status: 'good' },
    { name: 'Attention & Focus', score: 6, maxScore: 6, status: 'optimal' },
    { name: 'Language & Fluency', score: 3, maxScore: 3, status: 'optimal' },
    { name: 'Orientation to Time/Place', score: 6, maxScore: 6, status: 'optimal' },
  ],
  recommendations: [
    'Maintain daily 15-minute cognitive memory workouts on CogniCare.',
    'Continue prescribed Vitamin D routine and regular aerobic hydration.',
    'Next routine quarterly screening scheduled for December 2026.',
  ],
};

export const mockV2ScreeningData: V2ScreeningData = {
  initialTimer: '09:45',
  questions: [
    {
      id: 'q-v2-1',
      category: 'Attention & Focus',
      title: 'Which number comes next in the sequence?',
      questionNumber: 1,
      totalQuestions: 5,
      sequence: ['2', '4', '6', '8', '?'],
      options: ['10', '11', '12', '14'],
      correctAnswer: '10',
      explanation: 'Consecutive even numbers increasing by +2.',
    },
    {
      id: 'q-v2-2',
      category: 'Attention & Focus',
      title: 'Which number completes the pattern?',
      questionNumber: 2,
      totalQuestions: 5,
      sequence: ['5', '10', '15', '20', '?'],
      options: ['22', '25', '30', '35'],
      correctAnswer: '25',
      explanation: 'Multiples of 5 increasing by +5.',
    },
    {
      id: 'q-v2-3',
      category: 'Attention & Focus',
      title: 'Find the missing number in the reverse sequence:',
      questionNumber: 3,
      totalQuestions: 5,
      sequence: ['30', '25', '20', '15', '?'],
      options: ['5', '8', '10', '12'],
      correctAnswer: '10',
      explanation: 'Reverse sequence decreasing by -5.',
    },
    {
      id: 'q-v2-4',
      category: 'Attention & Focus',
      title: 'Identify the next term in the geometric progression:',
      questionNumber: 4,
      totalQuestions: 5,
      sequence: ['3', '6', '12', '24', '?'],
      options: ['36', '42', '48', '50'],
      correctAnswer: '48',
      explanation: 'Geometric sequence doubled at each step (x 2).',
    },
    {
      id: 'q-v2-5',
      category: 'Attention & Focus',
      title: 'Which number logically completes the square series?',
      questionNumber: 5,
      totalQuestions: 5,
      sequence: ['1', '4', '9', '16', '?'],
      options: ['20', '24', '25', '30'],
      correctAnswer: '25',
      explanation: 'Square numbers (1^2, 2^2, 3^2, 4^2, 5^2).',
    },
  ],
  memoryRecall: {
    instruction: 'Remember these items. You will be asked to recall them in the next step.',
    studyTimeSeconds: 30,
    items: [
      { id: 'm-1', label: 'Apple', icon: '🍎' },
      { id: 'm-2', label: 'Car', icon: '🚗' },
      { id: 'm-3', label: 'Chair', icon: '🪑' },
      { id: 'm-4', label: 'Tree', icon: '🌳' },
      { id: 'm-5', label: 'Football', icon: '⚽' },
      { id: 'm-6', label: 'Book', icon: '📕' },
    ],
  },
  review: {
    title: 'Review Your Answers',
    subtitle: 'Please review your answers before submitting the screening.',
    totalTimeFormatted: '12 min 35 sec',
    sections: [
      {
        id: 'sec-1',
        title: 'General Knowledge',
        score: '5 / 5 Correct',
        correctCount: 5,
        totalCount: 5,
        status: 'passed',
      },
      {
        id: 'sec-2',
        title: 'Attention & Focus',
        score: '4 / 5 Correct',
        correctCount: 4,
        totalCount: 5,
        status: 'passed',
      },
      {
        id: 'sec-3',
        title: 'Memory Recall',
        score: '6 / 6 Correct',
        correctCount: 6,
        totalCount: 6,
        status: 'passed',
      },
    ],
  },
  submission: {
    title: 'Submitting Your Screening...',
    subtitle: 'Please wait while we process your results. This will only take a moment.',
    stages: [
      { id: 'stg-1', label: 'Saving Answers', status: 'completed' },
      { id: 'stg-2', label: 'Analyzing Results', status: 'completed' },
      { id: 'stg-3', label: 'Generating Report', status: 'completed' },
    ],
  },
  results: {
    overallScore: 86,
    performanceBadge: 'Good Performance',
    disclaimer:
      'This is a screening result and not a diagnosis. For any concerns, please consult a healthcare professional.',
    domains: [
      { name: 'Memory', score: '90%', percentage: 90, width: '90%' },
      { name: 'Attention', score: '85%', percentage: 85, width: '85%' },
      { name: 'Language', score: '88%', percentage: 88, width: '88%' },
      { name: 'Executive Function', score: '86%', percentage: 86, width: '86%' },
      { name: 'Processing Speed', score: '82%', percentage: 82, width: '82%' },
    ],
  },
  historyAndTrends: {
    timeframe: 'Last 6 Months',
    sessions: [
      {
        id: 'sess-1',
        date: '05 Nov 2026',
        score: '86%',
        scoreValue: 86,
        status: 'Good',
        statusBg: 'bg-emerald-50 text-emerald-700',
      },
      {
        id: 'sess-2',
        date: '10 Aug 2026',
        score: '78%',
        scoreValue: 78,
        status: 'Good',
        statusBg: 'bg-emerald-50 text-emerald-700',
      },
      {
        id: 'sess-3',
        date: '12 Jun 2026',
        score: '72%',
        scoreValue: 72,
        status: 'Fair',
        statusBg: 'bg-amber-50 text-amber-700',
      },
    ],
    trendPoints: [
      { month: 'Jun', score: 72 },
      { month: 'Aug', score: 78 },
      { month: 'Nov', score: 86 },
    ],
    motivationalTip: 'Great progress! Keep up the regular screenings for better cognitive health.',
  },
};

