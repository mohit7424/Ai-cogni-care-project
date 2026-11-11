'use client';

import React, { useState } from 'react';
import { useDoctor } from '../hooks/useDoctor';
import { ScheduleAppointmentModal, PatientDetailModal } from '../components';

export default function DoctorAppointmentsScreen() {
  const {
    data,
    selectedPatient,
    isPatientModalOpen,
    setIsPatientModalOpen,
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    handleOpenPatientDetail,
    handleScheduleAppointment,
  } = useDoctor();

  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');

  if (!data) return null;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a3832] dark:text-white tracking-tight">
            Consultation Calendar &amp; Scheduling
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage your daily clinic appointments, cognitive reviews, and follow-ups
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsScheduleModalOpen(true)}
          className="px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8075] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>+</span>
          <span>Book Consultation</span>
        </button>
      </div>

      {/* View Switcher Strip */}
      <div className="flex items-center justify-between bg-white dark:bg-[#0c2b24] p-3 rounded-2xl border border-teal-100/80 dark:border-[#154c40] shadow-2xs">
        <div className="flex items-center gap-1.5">
          {(['day', 'week', 'month'] as const).map(mode => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize cursor-pointer ${
                viewMode === mode
                  ? 'bg-[#0d9488] text-white shadow-xs'
                  : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-[#124138]'
              }`}
            >
              {mode} View
            </button>
          ))}
        </div>
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
          Wednesday, 11 Nov 2026 ({data.todayAppointments.length} Booked)
        </span>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {data.todayAppointments.map(apt => (
          <div
            key={apt.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#0c2b24] border border-teal-100/80 dark:border-[#154c40] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 text-center py-2 px-3 rounded-2xl bg-teal-50 dark:bg-[#0d3b32] border border-teal-100 dark:border-[#144d41] shrink-0">
                <span className="text-sm font-black text-[#0d9488] dark:text-[#2dd4bf] block">
                  {apt.timeFormatted}
                </span>
                <span className="text-[10px] text-gray-400 font-semibold">
                  {apt.durationMinutes} min
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    {apt.patientName}
                  </h3>
                  <span className="font-mono text-xs text-gray-400 bg-gray-100 dark:bg-[#071f1a] px-2 py-0.5 rounded">
                    {apt.patientCode}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  <strong>{apt.type}</strong> • {apt.reason}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {apt.status}
              </span>
              <button
                type="button"
                onClick={() => {
                  const pat = data.patientsList.find(p => p.id === apt.patientId);
                  if (pat) handleOpenPatientDetail(pat);
                }}
                className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-[#19584b] text-xs font-bold text-[#0d9488] hover:bg-teal-50 cursor-pointer"
              >
                Patient History &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      <ScheduleAppointmentModal
        isOpen={isScheduleModalOpen}
        patients={data.patientsList}
        preselectedPatient={selectedPatient}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleScheduleAppointment}
      />

      <PatientDetailModal
        isOpen={isPatientModalOpen}
        patient={selectedPatient}
        onClose={() => setIsPatientModalOpen(false)}
      />
    </div>
  );
}

