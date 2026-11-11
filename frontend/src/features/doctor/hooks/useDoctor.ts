'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  DoctorDashboardData,
  DoctorPatientItem,
  PendingAssessmentItem,
  DoctorAppointmentItem,
  ClinicalNoteItem,
} from '../types/doctor.types';
import {
  getDoctorDashboardData,
  finalizeAssessmentReview,
  registerNewPatient,
  scheduleNewAppointment,
  createClinicalNote,
} from '../services/doctorService';

export function useDoctor() {
  const [data, setData] = useState<DoctorDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPatient, setSelectedPatient] = useState<DoctorPatientItem | null>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<PendingAssessmentItem | null>(null);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState<boolean>(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState<boolean>(false);
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState<boolean>(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState<boolean>(false);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState<boolean>(false);
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

  useEffect(() => {
    getDoctorDashboardData().then(res => {
      setData(res);
      setIsLoading(false);
    });
  }, []);

  const handleOpenPatientDetail = useCallback((patient: DoctorPatientItem) => {
    setSelectedPatient(patient);
    setIsPatientModalOpen(true);
  }, []);

  const handleOpenAssessmentReview = useCallback((assessment: PendingAssessmentItem) => {
    setSelectedAssessment(assessment);
    setIsAssessmentModalOpen(true);
  }, []);

  const handleFinalizeReview = useCallback(
    async (assessmentId: string, observation: string) => {
      if (!data) return;
      const res = await finalizeAssessmentReview(
        assessmentId,
        observation,
        data.doctor.name
      );
      if (res.success) {
        setData(prev => {
          if (!prev) return null;
          return {
            ...prev,
            pendingAssessments: prev.pendingAssessments.map(a =>
              a.id === assessmentId ? res.updatedAssessment : a
            ),
            summaryStats: {
              ...prev.summaryStats,
              pendingReviews: Math.max(0, prev.summaryStats.pendingReviews - 1),
            },
          };
        });
        setStatusFeedback('Assessment review finalized and saved to clinical record.');
        setIsAssessmentModalOpen(false);
      }
    },
    [data]
  );

  const handleRegisterPatient = useCallback(async (newPat: Partial<DoctorPatientItem>) => {
    const res = await registerNewPatient(newPat);
    if (res.success) {
      setData(prev => {
        if (!prev) return null;
        return {
          ...prev,
          patientsList: [res.patient, ...prev.patientsList],
          summaryStats: {
            ...prev.summaryStats,
            totalAssigned: prev.summaryStats.totalAssigned + 1,
            activePatients: prev.summaryStats.activePatients + 1,
          },
        };
      });
      setStatusFeedback(`Patient ${res.patient.name} (${res.patient.patientCode}) registered successfully.`);
      setIsNewPatientModalOpen(false);
    }
  }, []);

  const handleScheduleAppointment = useCallback(async (newApt: Partial<DoctorAppointmentItem>) => {
    const res = await scheduleNewAppointment(newApt);
    if (res.success) {
      setData(prev => {
        if (!prev) return null;
        return {
          ...prev,
          todayAppointments: [res.appointment, ...prev.todayAppointments],
          summaryStats: {
            ...prev.summaryStats,
            todayAppointmentsCount: prev.summaryStats.todayAppointmentsCount + 1,
          },
        };
      });
      setStatusFeedback(`Consultation scheduled for ${res.appointment.patientName} at ${res.appointment.timeFormatted}.`);
      setIsScheduleModalOpen(false);
    }
  }, []);

  const handleCreateNote = useCallback(async (newNote: Partial<ClinicalNoteItem>) => {
    const res = await createClinicalNote(newNote);
    if (res.success) {
      setData(prev => {
        if (!prev) return null;
        return {
          ...prev,
          clinicalNotes: [res.note, ...prev.clinicalNotes],
        };
      });
      setStatusFeedback('Clinical consultation note recorded.');
      setIsAddNoteModalOpen(false);
    }
  }, []);

  return {
    data,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedPatient,
    selectedAssessment,
    isPatientModalOpen,
    setIsPatientModalOpen,
    isAssessmentModalOpen,
    setIsAssessmentModalOpen,
    isNewPatientModalOpen,
    setIsNewPatientModalOpen,
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    isAddNoteModalOpen,
    setIsAddNoteModalOpen,
    statusFeedback,
    setStatusFeedback,
    handleOpenPatientDetail,
    handleOpenAssessmentReview,
    handleFinalizeReview,
    handleRegisterPatient,
    handleScheduleAppointment,
    handleCreateNote,
  };
}

