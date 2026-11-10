'use client';

import React from 'react';
import type { MedicationDoseItem } from '../types/medication.types';

interface Props {
  schedule: MedicationDoseItem[];
  completedCount: number;
  totalCount: number;
  dateBadge: string;
  onToggleStatus: (doseId: string) => void;
  onOpenAddModal: () => void;
}

export default function MedicationScheduleCard({
  schedule,
  completedCount,
  totalCount,
  dateBadge,
  onToggleStatus,
  onOpenAddModal,
}: Props) {
  return (
    <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-5 sm:p-8 shadow-xs flex flex-col justify-between space-y-6 transition-colors duration-200">
      {/* Header with Title and Date Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            Medication Schedule
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Today&apos;s planned doses and timings
          </p>
        </div>

        <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-[#0f352c] border border-gray-200 dark:border-[#19584b] px-3.5 py-1 rounded-full shadow-2xs self-start sm:self-auto shrink-0">
          {dateBadge}
        </span>
      </div>

      {/* Medication Doses List */}
      <div className="space-y-3 pt-1">
        {schedule.map(item => {
          const isTaken = item.status === 'taken';
          return (
            <div
              key={item.id}
              className={`p-3.5 sm:p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ${
                isTaken
                  ? 'bg-[#f8fcfa] dark:bg-[#071f1a] border-teal-100/90 dark:border-[#154c40]'
                  : 'bg-white dark:bg-[#0c2b24] border-gray-200 dark:border-[#19584b] hover:border-teal-200'
              }`}
            >
              {/* Left Side: Time Box + Name & Dosage */}
              <div className="flex items-center gap-3">
                {/* Time Box */}
                <div className="w-13 h-11 sm:w-14 sm:h-12 rounded-xl bg-[#f0faf7] dark:bg-[#0e352d] border border-teal-100 dark:border-[#19584b] text-[#0a3832] dark:text-[#2dd4bf] font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                  {item.timeFormatted}
                </div>

                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-snug truncate">
                    {item.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                    {item.dosageDetails}
                  </p>
                </div>
              </div>

              {/* Right Side: Taken / Pending Status Pill */}
              <button
                type="button"
                onClick={() => onToggleStatus(item.id)}
                className={`self-end sm:self-auto px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isTaken
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs'
                    : 'bg-amber-50 text-amber-800 border border-amber-200/80 hover:bg-amber-100'
                }`}
              >
                <span>{isTaken ? '✓' : '•'}</span>
                <span>{isTaken ? 'Taken' : 'Pending'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Adherence & Add Medicine Footer matching screenshot */}
      <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-medium text-gray-700">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0d9488]" />
          <span>
            Daily Adherence: <strong>{completedCount} of {totalCount} doses completed</strong>
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenAddModal}
          className="text-xs font-bold text-[#0d9488] hover:text-[#0a756b] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
        >
          <span>Add New Medicine</span>
          <span>+</span>
        </button>
      </div>
    </div>
  );
}

