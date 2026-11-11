'use client';

import React from 'react';
import type { PatientSummaryStats } from '../types/doctor.types';

interface Props {
  stats: PatientSummaryStats;
  onFilterClick?: (filterType: string) => void;
}

export default function DoctorMetricsGrid({ stats, onFilterClick }: Props) {
  const cards = [
    {
      id: 'pending',
      title: 'Pending Reviews',
      value: stats.pendingReviews,
      badge: 'Needs Action',
      badgeColor: 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-900',
      subtext: 'Completed cognitive screenings',
      icon: (
        <svg className="w-5 h-5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
      iconBg: 'bg-rose-50 dark:bg-rose-950/40',
    },
    {
      id: 'attention',
      title: 'Attention Queue',
      value: stats.attentionCount,
      badge: 'High Priority',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900',
      subtext: 'Flagged for clinical score drops',
      icon: (
        <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      iconBg: 'bg-amber-50 dark:bg-amber-950/40',
    },
    {
      id: 'today-apt',
      title: 'Today’s Consults',
      value: stats.todayAppointmentsCount,
      badge: '5 Scheduled',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-800',
      subtext: 'Next appointment at 10:30 AM',
      icon: (
        <svg className="w-5 h-5 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
      iconBg: 'bg-teal-50 dark:bg-[#0e3a31]',
    },
    {
      id: 'assigned',
      title: 'Total Patients',
      value: stats.totalAssigned,
      badge: `${stats.activePatients} Active`,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
      subtext: 'Assigned to your neurology roster',
      icon: (
        <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        </svg>
      ),
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      id: 'followups',
      title: 'Follow-ups Due',
      value: stats.followUpDueCount,
      badge: 'Timeline',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800',
      subtext: 'Routine longitudinal checkpoints',
      icon: (
        <svg className="w-5 h-5 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    },
    {
      id: 'active',
      title: 'Active Cohort',
      value: `${Math.round((stats.activePatients / stats.totalAssigned) * 100)}%`,
      badge: 'Engagement',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-800',
      subtext: 'Weekly compliance rate',
      icon: (
        <svg className="w-5 h-5 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      iconBg: 'bg-teal-50 dark:bg-[#0e3a31]',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
      {cards.map(c => (
        <div
          key={c.id}
          onClick={() => onFilterClick?.(c.id)}
          className="p-4 rounded-2xl bg-white dark:bg-[#0c2b24] border border-teal-100/80 dark:border-[#154c40] hover:border-teal-300 dark:hover:border-teal-600 transition shadow-xs flex flex-col justify-between space-y-3 cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${c.iconBg}`}>
              {c.icon}
            </div>
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${c.badgeColor}`}>
              {c.badge}
            </span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a3832] dark:text-white tracking-tight group-hover:text-[#0d9488] transition">
              {c.value}
            </h3>
            <p className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-0.5">
              {c.title}
            </p>
            <p className="text-[10.5px] text-gray-400 dark:text-gray-400 mt-0.5 truncate">
              {c.subtext}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

