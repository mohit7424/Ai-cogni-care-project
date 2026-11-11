'use client';

import React, { useState } from 'react';
import type { RecentSafetyAlertItem, SmsStatus } from '../types/safety.types';

interface Props {
  alerts: RecentSafetyAlertItem[];
  onViewDetails: (alertItem: RecentSafetyAlertItem) => void;
}

export default function RecentSafetyAlertsCard({
  alerts,
  onViewDetails,
}: Props) {
  const [filter, setFilter] = useState<'All' | SmsStatus>('All');

  const filteredAlerts = alerts.filter(a => {
    if (filter === 'All') return true;
    return a.smsStatus === filter;
  });

  return (
    <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-5 sm:p-7 shadow-xs space-y-5 transition-colors duration-200 h-full flex flex-col justify-between">
      <div>
        {/* Header with Clock Icon + Title + Filter Pills + View All */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-[#0f352c] text-[#0d9488] dark:text-[#2dd4bf] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                Recent Safety Alerts
              </h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                View your recent safety alerts and their status.
              </p>
            </div>
          </div>

          {/* Quick Filter Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(['All', 'SMS Sent', 'Delivered', 'Failed'] as const).map(tab => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-2.5 py-1 rounded-lg text-[10.5px] font-semibold transition cursor-pointer whitespace-nowrap ${
                  filter === tab
                    ? 'bg-[#0d9488] text-white'
                    : 'bg-gray-100 dark:bg-[#0f352c] text-gray-600 dark:text-gray-300 hover:bg-teal-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Alert Cards Grid — all screen sizes */}
        {filteredAlerts.length === 0 ? (
          <div className="py-10 text-center text-gray-400 text-xs">
            No safety alerts found for &quot;{filter}&quot;.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAlerts.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-gray-50/70 dark:bg-[#0f352c] border border-gray-100 dark:border-[#154c40] hover:border-rose-200 dark:hover:border-rose-800/50 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                {/* Top: Alert ID + triggered time */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-gray-800 dark:text-white">
                    {item.id}
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                    {item.triggeredAt}
                  </span>
                </div>

                {/* Status & SMS badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200/70 dark:border-rose-900/50">
                    <span>⚠</span>
                    <span>{item.status}</span>
                  </span>

                  {item.smsStatus === 'Failed' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200/70">
                      <span>⚠</span>
                      <span>{item.smsStatus}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 dark:bg-[#124138] text-emerald-700 dark:text-[#2dd4bf] border border-emerald-200/80 dark:border-[#155c4e]">
                      <span>✓</span>
                      <span>{item.smsStatus}</span>
                    </span>
                  )}

                  <span className="text-[10.5px] text-gray-500 dark:text-gray-400 ml-auto font-medium">
                    👥 {item.contactsNotified} notified
                  </span>
                </div>

                {/* View Details button */}
                <button
                  type="button"
                  onClick={() => onViewDetails(item)}
                  className="w-full py-2 rounded-xl border border-gray-200 dark:border-[#19584b] text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-[#0c2b24] hover:text-[#0d9488] hover:border-teal-200 text-xs font-semibold transition cursor-pointer"
                >
                  View Details →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
