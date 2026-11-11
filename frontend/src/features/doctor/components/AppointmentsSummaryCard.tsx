'use client';

import React from 'react';
import type { DoctorAppointmentItem } from '../types/doctor.types';

interface Props {
  appointments: DoctorAppointmentItem[];
  onOpenAppointment: (apt: DoctorAppointmentItem) => void;
  onScheduleNew: () => void;
}

export default function AppointmentsSummaryCard({
  appointments,
  onOpenAppointment,
  onScheduleNew,
}: Props) {
  return (
    <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-[#154c40]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-[#0e3a31] text-[#0d9488] dark:text-[#2dd4bf] flex items-center justify-center">
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-extrabold text-gray-900 dark:text-white tracking-tight">
              Today’s Consultations
            </h2>
            <p className="text-[11px] text-gray-400">
              Scheduled patient sessions &amp; cognitive follow-ups
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onScheduleNew}
          className="text-xs font-bold text-[#0d9488] dark:text-[#2dd4bf] hover:underline cursor-pointer"
        >
          + Book Slot
        </button>
      </div>

      {/* Appointment Slots */}
      <div className="space-y-3 overflow-y-auto max-h-[300px] pr-1">
        {appointments.map(apt => (
          <div
            key={apt.id}
            onClick={() => onOpenAppointment(apt)}
            className="p-3.5 rounded-2xl bg-[#f8fcfa] dark:bg-[#071f1a] border border-teal-100/70 dark:border-[#154c40] hover:border-[#0d9488] transition flex items-center justify-between gap-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              {/* Time Badge */}
              <div className="w-16 text-center py-1.5 px-2 rounded-xl bg-teal-50 dark:bg-[#0d3b32] border border-teal-100 dark:border-[#144d41] shrink-0">
                <span className="text-xs font-black text-[#0d9488] dark:text-[#2dd4bf]">
                  {apt.timeFormatted}
                </span>
                <span className="block text-[9px] text-gray-400 font-semibold">
                  {apt.durationMinutes} min
                </span>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#0d9488] transition">
                    {apt.patientName}
                  </h3>
                  <span className="text-[10px] font-mono text-gray-400">
                    ({apt.patientCode})
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 dark:text-gray-300 font-medium">
                  {apt.type} • <span className="text-gray-400 font-normal">{apt.reason}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  apt.status === 'Confirmed'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300'
                    : 'bg-teal-50 text-[#0d9488] border border-teal-200 dark:bg-[#0e3a31] dark:text-[#2dd4bf]'
                }`}
              >
                {apt.status}
              </span>
              <span className="text-gray-300 dark:text-gray-600 group-hover:text-teal-600 transition">
                &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

