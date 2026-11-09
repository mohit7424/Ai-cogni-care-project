'use client';

import React from 'react';
import type { NotificationSettings } from '../types/settings.types';

interface Props {
  notifications: NotificationSettings;
  onToggleNotification: (key: keyof NotificationSettings) => void;
}

export default function NotificationsTabContent({
  notifications,
  onToggleNotification,
}: Props) {
  const items: { key: keyof NotificationSettings; title: string; desc: string }[] = [
    {
      key: 'medicationAlerts',
      title: 'Medication Audio & Push Alerts',
      desc: 'Receive sound chime reminders on desktop and synced smart displays at planned dose times.',
    },
    {
      key: 'screeningReminders',
      title: 'Cognitive Screening Check-in Reminders',
      desc: 'Gentle morning notifications when your weekly or monthly cognitive screening is due.',
    },
    {
      key: 'weeklyProgressEmail',
      title: 'Weekly Neurological Digest Email',
      desc: 'Send a compiled weekly summary of completed activities and stability metrics to your registered email.',
    },
    {
      key: 'emergencySmsBackup',
      title: 'Emergency SMS Backup Notifications',
      desc: 'Send redundant SMS alerts to primary caregivers if an urgent safety or fall event triggers.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-900">Notification Preferences</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Configure how and when you receive reminders, reports, and care updates.
        </p>
      </div>

      <div className="space-y-4">
        {items.map(item => {
          const isEnabled = notifications[item.key];
          return (
            <div
              key={item.key}
              className="p-4 rounded-2xl border border-teal-100/70 bg-[#f9fdfc] flex items-center justify-between gap-4"
            >
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-gray-800">{item.title}</h4>
                <p className="text-[11.5px] text-gray-500 max-w-xl">{item.desc}</p>
              </div>

              <button
                type="button"
                onClick={() => onToggleNotification(item.key)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                  isEnabled ? 'bg-[#0d9488]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform absolute top-1 ${
                    isEnabled ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

