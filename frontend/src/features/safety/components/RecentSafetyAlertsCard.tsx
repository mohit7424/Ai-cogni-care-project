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

        {/* 1. Desktop & Tablet Table (sm and up) */}
        <div className="hidden sm:block overflow-x-auto -mx-6 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 dark:border-[#154c40] text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Alert ID</th>
                  <th className="py-2.5 px-3">Triggered Date &amp; Time</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">SMS Status</th>
                  <th className="py-2.5 px-3 text-center">Contacts Notified</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/70 dark:divide-[#154c40]/70">
                {filteredAlerts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-400 text-xs">
                      No safety alerts found for &quot;{filter}&quot;.
                    </td>
                  </tr>
                ) : (
                  filteredAlerts.map(item => (
                    <tr
                      key={item.id}
                      className="hover:bg-teal-50/30 dark:hover:bg-[#0e352d]/40 transition"
                    >
                      <td className="py-3 px-3 font-mono font-semibold text-gray-800 dark:text-white">
                        {item.id}
                      </td>

                      <td className="py-3 px-3 text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap">
                        {item.triggeredAt}
                      </td>

                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200/70 dark:border-rose-900/50 whitespace-nowrap">
                          <span>⚠</span>
                          <span>{item.status}</span>
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        {item.smsStatus === 'Failed' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200/70 dark:border-amber-900/50 whitespace-nowrap">
                            <span>⚠</span>
                            <span>{item.smsStatus}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 dark:bg-[#124138] text-emerald-700 dark:text-[#2dd4bf] border border-emerald-200/80 dark:border-[#155c4e] whitespace-nowrap">
                            <span>✓</span>
                            <span>{item.smsStatus}</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3 font-medium text-gray-700 dark:text-gray-300 text-center">
                        {item.contactsNotified}
                      </td>

                      <td className="py-3 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => onViewDetails(item)}
                          className="px-2.5 py-1 rounded-lg border border-gray-200 dark:border-[#19584b] text-gray-600 dark:text-gray-300 hover:text-[#0d9488] dark:hover:text-white hover:border-teal-200 text-[11px] font-semibold transition cursor-pointer whitespace-nowrap"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Mobile Responsive Alert Cards (< sm screens) */}
        <div className="sm:hidden space-y-2.5">
          {filteredAlerts.length === 0 ? (
            <div className="py-6 text-center text-gray-400 text-xs">
              No safety alerts found for &quot;{filter}&quot;.
            </div>
          ) : (
            filteredAlerts.map(item => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-gray-50/70 dark:bg-[#0f352c] border border-gray-100 dark:border-[#154c40] space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-gray-800 dark:text-white">
                    {item.id}
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">
                    {item.triggeredAt}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200/70">
                    <span>⚠</span>
                    <span>{item.status}</span>
                  </span>

                  {item.smsStatus === 'Failed' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200/70">
                      <span>⚠</span>
                      <span>{item.smsStatus}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 dark:bg-[#124138] text-emerald-700 dark:text-[#2dd4bf] border border-emerald-200/80">
                      <span>✓</span>
                      <span>{item.smsStatus}</span>
                    </span>
                  )}

                  <span className="text-[11px] text-gray-500 dark:text-gray-300 ml-auto font-medium">
                    Notified: {item.contactsNotified}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onViewDetails(item)}
                  className="w-full py-1.5 rounded-xl border border-gray-200 dark:border-[#19584b] text-gray-700 dark:text-gray-200 text-xs font-semibold hover:bg-white dark:hover:bg-[#0c2b24] transition text-center"
                >
                  View Details &rarr;
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
