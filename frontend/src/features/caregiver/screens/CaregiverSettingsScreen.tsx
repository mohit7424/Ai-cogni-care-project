'use client';

import { useState } from 'react';
import { useCaregiver } from '../hooks/useCaregiver';

export default function CaregiverSettingsScreen() {
  const { data } = useCaregiver();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [reminderTime, setReminderTime] = useState('30 minutes before');

  return (
    <div className="min-h-screen bg-[#ecf7f5] dark:bg-[#061815] p-4 md:p-6 space-y-6">
      <div className="rounded-3xl bg-white dark:bg-[#0c2b24] p-5 shadow-sm">
        <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">
          Caregiver Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-teal-300 mt-1">
          Manage your caregiver profile and notification preferences
        </p>
      </div>

      <div className="rounded-3xl bg-white dark:bg-[#0c2b24] p-5 md:p-6 shadow-sm space-y-6">
        <section className="space-y-3">
          <h2 className="text-sm font-extrabold text-gray-800 dark:text-white">
            Caregiver Profile
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1" htmlFor="caregiver-name">
                Name
              </label>
              <input
                id="caregiver-name"
                value={data.caregiver.name}
                disabled
                className="w-full rounded-xl border bg-gray-50 dark:bg-[#071f1a] p-2.5 text-sm text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1" htmlFor="caregiver-role">
                Relationship
              </label>
              <input
                id="caregiver-role"
                value={data.caregiver.relationship}
                disabled
                className="w-full rounded-xl border bg-gray-50 dark:bg-[#071f1a] p-2.5 text-sm text-gray-800 dark:text-white"
              />
            </div>
          </div>
        </section>

        <section className="border-t border-gray-100 dark:border-[#154c40] pt-5 space-y-3">
          <h2 className="text-sm font-extrabold text-gray-800 dark:text-white">
            Notifications
          </h2>
          <label className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-200">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={event => setEmailNotifications(event.target.checked)}
              className="h-4 w-4 rounded text-[#0d9488]"
            />
            Email alerts for patient activity and care updates
          </label>
          <label className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-200">
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={event => setSmsNotifications(event.target.checked)}
              className="h-4 w-4 rounded text-[#0d9488]"
            />
            SMS alerts for urgent patient notifications
          </label>
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1" htmlFor="reminder-time">
              Appointment reminder
            </label>
            <select
              id="reminder-time"
              value={reminderTime}
              onChange={event => setReminderTime(event.target.value)}
              className="w-full sm:w-auto rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] p-2.5 text-sm text-gray-800 dark:text-white"
            >
              <option>15 minutes before</option>
              <option>30 minutes before</option>
              <option>1 hour before</option>
              <option>1 day before</option>
            </select>
          </div>
        </section>
      </div>
    </div>
  );
}
