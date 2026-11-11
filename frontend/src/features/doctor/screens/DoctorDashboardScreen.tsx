'use client';

import React from 'react';
import { useDoctor } from '../hooks/useDoctor';
import {
  DoctorWelcomeBanner,
  DoctorMetricsGrid,
  PendingReviewQueueCard,
  AttentionQueueCard,
  AppointmentsSummaryCard,
  CognitiveCohortChartCard,
  RecentActivityFeedCard,
  AssessmentReviewModal,
  PatientDetailModal,
  NewPatientModal,
  ScheduleAppointmentModal,
  AddClinicalNoteModal,
} from '../components';

export default function DoctorDashboardScreen() {
  const {
    data,
    isLoading,
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
  } = useDoctor();

  if (isLoading || !data) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-teal-200 border-t-[#0d9488] rounded-full animate-spin mx-auto" />
        <p className="text-xs text-gray-500 font-semibold">Loading Clinical Workspace...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* Toast Feedback Banner */}
      {statusFeedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>{statusFeedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusFeedback(null)}
            className="text-emerald-600 hover:text-emerald-800 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* DASH-01 & DASH-09: Doctor Welcome Header & Quick Action Shortcuts */}
      <DoctorWelcomeBanner
        doctor={data.doctor}
        dateLabel={data.dateLabel}
        lastUpdatedLabel={data.lastUpdatedLabel}
        onNewPatient={() => setIsNewPatientModalOpen(true)}
        onScheduleApt={() => setIsScheduleModalOpen(true)}
        onAddNote={() => setIsAddNoteModalOpen(true)}
      />

      {/* DASH-02, DASH-03, DASH-04: Metrics Grid */}
      <DoctorMetricsGrid stats={data.summaryStats} />

      {/* Middle Row: Pending Assessment Work Queue (Left 7 cols) + Attention Queue (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        <div className="lg:col-span-7 flex flex-col">
          <PendingReviewQueueCard
            assessments={data.pendingAssessments}
            onReview={handleOpenAssessmentReview}
          />
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <AttentionQueueCard
            items={data.attentionQueue}
            onActionClick={item => {
              const pat = data.patientsList.find(p => p.id === item.patientId);
              if (pat) handleOpenPatientDetail(pat);
            }}
          />
        </div>
      </div>

      {/* Bottom Row: Today's Appointments (4 cols) + Cohort Distribution (4 cols) + Activity Feed (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        <div className="lg:col-span-5 flex flex-col">
          <AppointmentsSummaryCard
            appointments={data.todayAppointments}
            onOpenAppointment={apt => {
              const pat = data.patientsList.find(p => p.id === apt.patientId);
              if (pat) handleOpenPatientDetail(pat);
            }}
            onScheduleNew={() => setIsScheduleModalOpen(true)}
          />
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <CognitiveCohortChartCard
            cohort={data.cohortDistribution}
            totalPatients={data.summaryStats.totalAssigned}
          />
        </div>

        <div className="lg:col-span-3 flex flex-col">
          <RecentActivityFeedCard activities={data.recentActivities} />
        </div>
      </div>

      {/* Interactive Modals */}
      <AssessmentReviewModal
        isOpen={isAssessmentModalOpen}
        assessment={selectedAssessment}
        onClose={() => setIsAssessmentModalOpen(false)}
        onFinalizeReview={handleFinalizeReview}
      />

      <PatientDetailModal
        isOpen={isPatientModalOpen}
        patient={selectedPatient}
        onClose={() => setIsPatientModalOpen(false)}
        onScheduleApt={() => {
          setIsPatientModalOpen(false);
          setIsScheduleModalOpen(true);
        }}
      />

      <NewPatientModal
        isOpen={isNewPatientModalOpen}
        onClose={() => setIsNewPatientModalOpen(false)}
        onRegister={handleRegisterPatient}
      />

      <ScheduleAppointmentModal
        isOpen={isScheduleModalOpen}
        patients={data.patientsList}
        preselectedPatient={selectedPatient}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleScheduleAppointment}
      />

      <AddClinicalNoteModal
        isOpen={isAddNoteModalOpen}
        patients={data.patientsList}
        onClose={() => setIsAddNoteModalOpen(false)}
        onSaveNote={handleCreateNote}
      />
    </div>
  );
}
