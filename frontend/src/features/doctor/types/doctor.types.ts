export type AssessmentStatus = 'Pending Review' | 'Reviewed' | 'In Progress' | 'Archived';
export type AttentionSeverity = 'High' | 'Medium' | 'Low';
export type AppointmentStatus = 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Rescheduled';
export type PatientRecordStatus = 'Active' | 'Under Evaluation' | 'Stable' | 'Needs Follow-up' | 'Archived';

export interface DoctorProfile {
  id: string;
  name: string;
  title: string;
  specialization: string;
  initials: string;
  avatarUrl?: string;
  clinic: string;
  licenseNumber: string;
}

export interface PatientSummaryStats {
  totalAssigned: number;
  activePatients: number;
  pendingReviews: number;
  attentionCount: number;
  todayAppointmentsCount: number;
  followUpDueCount: number;
}

export interface DoctorPatientItem {
  id: string;
  patientCode: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  contactPhone: string;
  email: string;
  assignedDate: string;
  status: PatientRecordStatus;
  primaryCaregiver: {
    name: string;
    relationship: string;
    phone: string;
  };
  latestMmseScore?: {
    score: number;
    total: number;
    date: string;
    clinicalRange: 'Normal' | 'Mild Cognitive Impairment' | 'Moderate' | 'Severe';
  };
  hasAttentionFlag?: boolean;
  attentionReason?: string;
  nextFollowUpDate?: string;
  medicalConditions: string[];
  currentMedications: string[];
}

export interface MmseDomainResult {
  domain: string;
  score: number;
  maxScore: number;
  status: 'Optimal' | 'Normal' | 'Needs Attention';
}

export interface PendingAssessmentItem {
  id: string;
  patientId: string;
  patientName: string;
  patientCode: string;
  age: number;
  instrument: string; // e.g. "MMSE v2.1"
  completionDate: string;
  durationMinutes: number;
  totalScore: number;
  maxScore: number;
  status: AssessmentStatus;
  flagReason?: string;
  domains: MmseDomainResult[];
  patientResponses: {
    question: string;
    category: string;
    response: string;
    scoreGiven: number;
  }[];
  preliminaryInterpretation: string;
  doctorObservationDraft?: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface AttentionQueueItem {
  id: string;
  patientId: string;
  patientName: string;
  patientCode: string;
  severity: AttentionSeverity;
  flagDate: string;
  reason: string;
  triggerEvent: string;
  actionRequired: string;
}

export interface DoctorAppointmentItem {
  id: string;
  patientId: string;
  patientName: string;
  patientCode: string;
  timeFormatted: string; // e.g. "10:30 AM"
  date: string;
  durationMinutes: number;
  type: 'In-Person Consultation' | 'Cognitive Follow-up' | 'Assessment Review' | 'Tele-consult';
  status: AppointmentStatus;
  reason: string;
}

export interface RecentClinicalEvent {
  id: string;
  timestamp: string;
  eventType: 'assessment_completed' | 'note_added' | 'report_generated' | 'appointment_booked' | 'flag_raised';
  patientName: string;
  patientCode: string;
  description: string;
  author: string;
}

export interface CohortDistributionItem {
  category: 'Normal Cognitive Range' | 'Mild Cognitive Impairment' | 'Under Closer Monitoring';
  count: number;
  percentage: number;
  color: string;
}

export interface ClinicalNoteItem {
  id: string;
  patientId: string;
  patientName: string;
  patientCode: string;
  date: string;
  category: 'Consultation' | 'Observation' | 'Follow-up' | 'Care-plan review';
  author: string;
  title: string;
  content: string;
  isDraft: boolean;
  recommendations: string[];
}

export interface CarePlanItem {
  id: string;
  patientId: string;
  patientName: string;
  patientCode: string;
  title: string;
  status: 'Active' | 'Paused' | 'Completed';
  startDate: string;
  reviewDate: string;
  goals: string[];
  recommendations: string[];
  tasks: {
    title: string;
    due: string;
    completed: boolean;
  }[];
}

export interface DoctorDashboardData {
  doctor: DoctorProfile;
  dateLabel: string;
  lastUpdatedLabel: string;
  summaryStats: PatientSummaryStats;
  pendingAssessments: PendingAssessmentItem[];
  attentionQueue: AttentionQueueItem[];
  todayAppointments: DoctorAppointmentItem[];
  recentActivities: RecentClinicalEvent[];
  cohortDistribution: CohortDistributionItem[];
  patientsList: DoctorPatientItem[];
  clinicalNotes: ClinicalNoteItem[];
  carePlans: CarePlanItem[];
}

