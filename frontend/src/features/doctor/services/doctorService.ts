import type {
  DoctorDashboardData,
  DoctorPatientItem,
  PendingAssessmentItem,
  DoctorAppointmentItem,
  ClinicalNoteItem,
} from '../types/doctor.types';
import { mockDoctorDashboardData } from '../data/doctor.data';

export async function getDoctorDashboardData(): Promise<DoctorDashboardData> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockDoctorDashboardData);
    }, 150);
  });
}

export async function finalizeAssessmentReview(
  assessmentId: string,
  doctorObservation: string,
  reviewerName: string
): Promise<{ success: boolean; updatedAssessment: PendingAssessmentItem }> {
  return new Promise(resolve => {
    setTimeout(() => {
      const assessment = mockDoctorDashboardData.pendingAssessments.find(a => a.id === assessmentId);
      const now = new Date();
      const updated: PendingAssessmentItem = {
        ...(assessment || mockDoctorDashboardData.pendingAssessments[0]),
        status: 'Reviewed',
        doctorObservationDraft: doctorObservation,
        reviewedBy: reviewerName,
        reviewedAt: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      resolve({ success: true, updatedAssessment: updated });
    }, 300);
  });
}

export async function registerNewPatient(
  patientData: Partial<DoctorPatientItem>
): Promise<{ success: boolean; patient: DoctorPatientItem }> {
  return new Promise(resolve => {
    setTimeout(() => {
      const newPatient: DoctorPatientItem = {
        id: `pat-${Date.now()}`,
        patientCode: `CC-00${Math.floor(100 + Math.random() * 900)}`,
        name: patientData.name || 'New Patient',
        age: patientData.age || 65,
        gender: patientData.gender || 'Female',
        dob: patientData.dob || '1961-01-01',
        contactPhone: patientData.contactPhone || '+91 98000 00000',
        email: patientData.email || 'patient@example.com',
        assignedDate: 'Today',
        status: 'Active',
        primaryCaregiver: patientData.primaryCaregiver || {
          name: 'Primary Caregiver',
          relationship: 'Family Member',
          phone: '+91 98000 00001',
        },
        medicalConditions: patientData.medicalConditions || ['Under Evaluation'],
        currentMedications: patientData.currentMedications || [],
      };
      resolve({ success: true, patient: newPatient });
    }, 300);
  });
}

export async function scheduleNewAppointment(
  appointmentData: Partial<DoctorAppointmentItem>
): Promise<{ success: boolean; appointment: DoctorAppointmentItem }> {
  return new Promise(resolve => {
    setTimeout(() => {
      const newApt: DoctorAppointmentItem = {
        id: `apt-${Date.now()}`,
        patientId: appointmentData.patientId || 'pat-001',
        patientName: appointmentData.patientName || 'Alex Parker',
        patientCode: appointmentData.patientCode || 'CC-00258',
        timeFormatted: appointmentData.timeFormatted || '11:00 AM',
        date: appointmentData.date || 'Today',
        durationMinutes: appointmentData.durationMinutes || 30,
        type: appointmentData.type || 'In-Person Consultation',
        status: 'Scheduled',
        reason: appointmentData.reason || 'Routine cognitive evaluation',
      };
      resolve({ success: true, appointment: newApt });
    }, 300);
  });
}

export async function createClinicalNote(
  noteData: Partial<ClinicalNoteItem>
): Promise<{ success: boolean; note: ClinicalNoteItem }> {
  return new Promise(resolve => {
    setTimeout(() => {
      const newNote: ClinicalNoteItem = {
        id: `note-${Date.now()}`,
        patientId: noteData.patientId || 'pat-001',
        patientName: noteData.patientName || 'Alex Parker',
        patientCode: noteData.patientCode || 'CC-00258',
        date: 'Today',
        category: noteData.category || 'Consultation',
        author: noteData.author || 'Dr. Sarah Jenkins',
        title: noteData.title || 'Clinical Evaluation Note',
        content: noteData.content || '',
        isDraft: false,
        recommendations: noteData.recommendations || [],
      };
      resolve({ success: true, note: newNote });
    }, 300);
  });
}

