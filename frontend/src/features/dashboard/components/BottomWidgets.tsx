'use client';

import React from 'react';
import type { ActivityItem, MedicationReminder } from '../types/dashboard.types';

interface BottomWidgetsProps {
  activity?: ActivityItem;
  medication?: MedicationReminder;
  onViewActivity?: () => void;
  onViewMedication?: () => void;
}

export default function BottomWidgets({
  activity = {
    id: 'act-1',
    title: 'Memory Exercise',
    category: 'Upcoming Activities',
    scheduledTime: 'Scheduled for Today',
    duration: '15 mins',
    completed: false,
  },
  medication = {
    id: 'med-1',
    name: 'Vitamin D (1000 IU)',
    dosage: '1000 IU',
    time: '08:00 AM',
    period: 'Morning Dose',
    taken: false,
  },
  onViewActivity,
  onViewMedication,
}: BottomWidgetsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Activity Card */}
      <div className="bg-white dark:bg-[#0c2b24] rounded-2xl border border-gray-100 dark:border-[#154c40] p-4 shadow-2xs flex items-center justify-between transition-colors duration-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-[#0f352c] text-[#0d9488] dark:text-[#2dd4bf] flex items-center justify-center text-lg font-bold shrink-0">
            🧩
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-400 tracking-wider">
              {activity.category}
            </p>
            <h4 className="text-xs font-bold text-gray-800 dark:text-white">{activity.title}</h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-300">
              {activity.scheduledTime} • {activity.duration}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewActivity}
          className="text-xs font-bold text-[#0d9488] dark:text-[#2dd4bf] hover:text-teal-700 dark:hover:text-teal-200 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View All</span>
          <span>&rarr;</span>
        </button>
      </div>

      {/* Medication Reminder Card */}
      <div className="bg-white dark:bg-[#0c2b24] rounded-2xl border border-gray-100 dark:border-[#154c40] p-4 shadow-2xs flex items-center justify-between transition-colors duration-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-[#3b2a10] text-amber-600 dark:text-amber-400 flex items-center justify-center text-lg font-bold shrink-0">
            💊
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-400 tracking-wider">
              Medication Reminder
            </p>
            <h4 className="text-xs font-bold text-gray-800 dark:text-white">{medication.name}</h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-300">
              {medication.time} • {medication.period}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewMedication}
          className="text-xs font-bold text-[#0d9488] dark:text-[#2dd4bf] hover:text-teal-700 dark:hover:text-teal-200 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View Details</span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}
