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
    <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
      {/* Header with Title and Date Badge */}
      <div className="flex items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Medication Schedule
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Today&apos;s planned doses and timings
          </p>
        </div>

        <span className="text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 px-3.5 py-1 rounded-full shadow-2xs shrink-0">
          {dateBadge}
        </span>
      </div>

      {/* Medication Doses List matching screenshot 2 */}
      <div className="space-y-3 pt-1">
        {schedule.map(item => {
          const isTaken = item.status === 'taken';
          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition flex items-center justify-between gap-4 ${
                isTaken
                  ? 'bg-[#f8fcfa] border-teal-100/90'
                  : 'bg-white border-gray-200 hover:border-teal-200'
              }`}
            >
              {/* Left Side: Time Box + Name & Dosage */}
              <div className="flex items-center gap-3.5">
                {/* 08:00 Box */}
                <div className="w-14 h-12 rounded-xl bg-[#f0faf7] border border-teal-100 text-[#0a3832] font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                  {item.timeFormatted}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.dosageDetails}
                  </p>
                </div>
              </div>

              {/* Right Side: Taken / Pending Status Pill */}
              <button
                type="button"
                onClick={() => onToggleStatus(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
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

