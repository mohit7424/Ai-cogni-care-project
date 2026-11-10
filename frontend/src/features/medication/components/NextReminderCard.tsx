'use client';

import React from 'react';
import type { NextReminderInfo } from '../types/medication.types';

interface Props {
  reminder: NextReminderInfo;
  isTaken: boolean;
  onMarkAsTaken: () => void;
}

export default function NextReminderCard({
  reminder,
  isTaken,
  onMarkAsTaken,
}: Props) {
  return (
    <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6 transition-colors duration-200">
      <div className="text-center space-y-4">
        {/* Pill / Capsule Icon Area */}
        <div className="py-2 flex justify-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#e2f7f1] to-[#c7efe5] dark:from-[#0d3b32] dark:to-[#124d41] flex items-center justify-center shadow-inner">
            <svg
              className="w-10 h-10 text-[#0d9488] dark:text-[#2dd4bf]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
              <line x1="8.5" y1="8.5" x2="15.5" y2="15.5" />
            </svg>
          </div>
        </div>

        {/* Next Reminder Pill Tag */}
        <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#0d9488] dark:text-[#2dd4bf] bg-[#eefaf6] dark:bg-[#071f1a] px-3.5 py-1 rounded-full border border-teal-100 dark:border-[#154c40]">
          NEXT REMINDER
        </span>

        {/* Time & Medication Details */}
        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a3832] dark:text-teal-200 tracking-tight">
            {reminder.time}
          </h2>
          <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
            {reminder.medicationName}
          </p>
        </div>

        {/* Instruction Note with (i) Icon */}
        <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#f0faf7] dark:bg-[#071f1a] border border-teal-100/70 dark:border-[#154c40] text-xs text-gray-600 dark:text-gray-300 max-w-sm mx-auto">
          <span className="w-4 h-4 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
            i
          </span>
          <span className="text-[11.5px] font-medium leading-snug">
            {reminder.instruction}
          </span>
        </div>

        {/* Action Button: Mark as Taken */}
        <div className="pt-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={onMarkAsTaken}
            disabled={isTaken}
            className={`w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
              isTaken
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-none cursor-default'
                : 'bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] text-white shadow-teal-900/10'
            }`}
          >
            <span>✓</span>
            <span>{isTaken ? 'Dose Completed' : 'Mark as Taken'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Sub-notice with Clock */}
      <div className="pt-4 border-t border-gray-100 dark:border-[#154c40] flex items-center justify-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-400 font-medium">
        <span>⏱</span>
        <span>Set reminders to stay on track with your medication.</span>
      </div>
    </div>
  );
}

