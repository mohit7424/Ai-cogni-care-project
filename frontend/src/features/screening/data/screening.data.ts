import type {
  ScreeningOverview,
  ScreeningQuestion,
  FinalScreeningResult,
} from '../types/screening.types';

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

