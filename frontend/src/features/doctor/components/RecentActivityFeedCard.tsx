'use client';

import React from 'react';
import type { RecentClinicalEvent } from '../types/doctor.types';

interface Props {
  activities: RecentClinicalEvent[];
}

export default function RecentActivityFeedCard({ activities }: Props) {
  function getEventIcon(type: RecentClinicalEvent['eventType']) {
    switch (type) {
      case 'assessment_completed':
        return '🧠';
      case 'report_generated':
        return '📄';
      case 'appointment_booked':
        return '📅';
      case 'note_added':
        return '📝';
      case 'flag_raised':
        return '⚠';
      default:
        return '•';
    }
  }

  return (
    <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 transition-colors duration-200">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-[#154c40]">
        <div>
          <h2 className="text-base font-extrabold text-gray-900 dark:text-white tracking-tight">
            Recent Clinical Events
          </h2>
          <p className="text-[11px] text-gray-400">
            Real-time activity across your assigned patient records
          </p>
        </div>
        <span className="text-[11px] text-teal-700 dark:text-teal-300 font-semibold">
          Live Feed
        </span>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
        {activities.map(act => (
          <div
            key={act.id}
            className="p-3 rounded-2xl bg-[#f8fcfa] dark:bg-[#071f1a] border border-gray-100 dark:border-[#154c40] flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-[#0d3b32] text-sm flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              {getEventIcon(act.eventType)}
            </div>

            <div className="flex-1 min-w-0 space-y-0.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-gray-800 dark:text-white truncate">
                  {act.patientName} <span className="font-mono text-gray-400 font-normal">({act.patientCode})</span>
                </span>
                <span className="text-[10px] text-gray-400 shrink-0">
                  {act.timestamp}
                </span>
              </div>

              <p className="text-[11.5px] text-gray-600 dark:text-gray-300 leading-snug">
                {act.description}
              </p>

              <span className="inline-block text-[9.5px] text-gray-400 italic">
                By {act.author}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

