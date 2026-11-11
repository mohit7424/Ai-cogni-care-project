'use client';

import React from 'react';
import type { DoctorProfile } from '../types/doctor.types';

interface Props {
  doctor: DoctorProfile;
  dateLabel: string;
  lastUpdatedLabel: string;
  onNewPatient: () => void;
  onScheduleApt: () => void;
  onAddNote: () => void;
}

export default function DoctorWelcomeBanner({
  doctor,
  dateLabel,
  lastUpdatedLabel,
  onNewPatient,
  onScheduleApt,
  onAddNote,
}: Props) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#0d443c] via-[#0a3832] to-[#072824] rounded-3xl p-5 sm:p-7 text-white shadow-md border border-[#14574d]/60">
      {/* Decorative Stethoscope / Cross Graphic in Background */}
      <div className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none opacity-10 hidden md:flex items-center justify-end pr-8">
        <svg viewBox="0 0 200 200" className="w-56 h-56 text-teal-300" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M100 20 v160 M20 100 h160" />
          <circle cx="100" cy="100" r="60" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: Avatar + Doctor Identity + Clinic */}
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#0e8a7d] to-[#2dd4bf] text-white flex items-center justify-center font-extrabold text-xl ring-4 ring-teal-400/30 shrink-0 shadow-inner">
            {doctor.initials}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Welcome back, {doctor.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#145a50] text-teal-200 border border-teal-400/30">
                Verified Clinician
              </span>
            </div>

            <p className="text-xs sm:text-sm text-teal-100/90 font-medium">
              {doctor.title} • <span className="text-teal-200">{doctor.specialization}</span>
            </p>

            <div className="flex items-center gap-3 text-[11px] text-teal-300/80 pt-0.5 flex-wrap">
              <span>📅 {dateLabel}</span>
              <span>•</span>
              <span>🏥 {doctor.clinic}</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">Synced {lastUpdatedLabel}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Action Shortcuts */}
        <div className="flex items-center gap-2.5 flex-wrap self-start lg:self-center">
          {/* + New Patient Button */}
          <button
            type="button"
            onClick={onNewPatient}
            className="px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer touch-manipulation"
          >
            <span className="text-base leading-none">+</span>
            <span>New Patient</span>
          </button>

          {/* Schedule Consultation Button */}
          <button
            type="button"
            onClick={onScheduleApt}
            className="px-3.5 py-2.5 bg-[#124d45] hover:bg-[#165a51] active:scale-[0.98] text-white text-xs font-semibold rounded-xl border border-teal-300/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-4 h-4 text-teal-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Schedule Apt</span>
          </button>

          {/* + Add Clinical Note Button */}
          <button
            type="button"
            onClick={onAddNote}
            className="px-3.5 py-2.5 bg-[#124d45] hover:bg-[#165a51] active:scale-[0.98] text-white text-xs font-semibold rounded-xl border border-teal-300/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-4 h-4 text-teal-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            <span>Add Note</span>
          </button>
        </div>
      </div>
    </div>
  );
}

