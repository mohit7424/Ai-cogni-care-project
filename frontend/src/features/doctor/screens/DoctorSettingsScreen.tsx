'use client';

import React, { useState } from 'react';
import { useDoctor } from '../hooks/useDoctor';

export default function DoctorSettingsScreen() {
  const { data } = useDoctor();

  const [availability, setAvailability] = useState('09:00 AM - 05:00 PM');
  const [duration, setDuration] = useState('30 mins');
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(true);
  const [auditLogging, setAuditLogging] = useState(true);

  if (!data) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a3832] dark:text-white tracking-tight">
          Doctor Workspace Settings
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Manage clinical availability, notification rules, and HIPAA compliance credentials
        </p>
      </div>

      <div className="bg-white dark:bg-[#0c2b24] p-6 rounded-3xl border border-teal-100/80 dark:border-[#154c40] space-y-6 shadow-xs text-xs">
        {/* Clinician Profile */}
        <div className="space-y-3 pb-5 border-b border-gray-100 dark:border-[#154c40]">
          <h2 className="text-sm font-extrabold text-gray-900 dark:text-white">Professional Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-400 mb-1">Doctor Name</label>
              <input
                type="text"
                disabled
                value={data.doctor.name}
                className="w-full p-2.5 rounded-xl border bg-gray-50 dark:bg-[#071f1a] text-gray-800 dark:text-white font-semibold"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-400 mb-1">License &amp; Registration Number</label>
              <input
                type="text"
                disabled
                value={data.doctor.licenseNumber}
                className="w-full p-2.5 rounded-xl border bg-gray-50 dark:bg-[#071f1a] text-gray-800 dark:text-white font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Clinical Availability */}
        <div className="space-y-3 pb-5 border-b border-gray-100 dark:border-[#154c40]">
          <h2 className="text-sm font-extrabold text-gray-900 dark:text-white">Consultation Availability</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-400 mb-1">Working Hours</label>
              <input
                type="text"
                value={availability}
                onChange={e => setAvailability(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-400 mb-1">Default Slot Duration</label>
              <select
                value={duration}
                onChange={e => setDuration(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-gray-800 dark:text-white"
              >
                <option value="30 mins">30 mins</option>
                <option value="45 mins">45 mins</option>
                <option value="60 mins">60 mins</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications & Audit */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold text-gray-900 dark:text-white">Security &amp; Notifications</h2>
          <div className="space-y-2.5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyEmail}
                onChange={e => setNotifyEmail(e.target.checked)}
                className="w-4 h-4 text-[#0d9488] rounded"
              />
              <span className="text-gray-800 dark:text-gray-200 font-medium">Email alerts when a patient completes a screening</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifySms}
                onChange={e => setNotifySms(e.target.checked)}
                className="w-4 h-4 text-[#0d9488] rounded"
              />
              <span className="text-gray-800 dark:text-gray-200 font-medium">SMS notification on emergency safety SOS alerts</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={auditLogging}
                onChange={e => setAuditLogging(e.target.checked)}
                className="w-4 h-4 text-[#0d9488] rounded"
              />
              <span className="text-gray-800 dark:text-gray-200 font-medium">Enforce HIPAA compliant immutable clinical audit logging</span>
            </label>
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="button"
            onClick={() => alert('Doctor workspace preferences saved successfully.')}
            className="px-5 py-2.5 rounded-xl bg-[#0d9488] hover:bg-[#0b8075] text-white font-bold cursor-pointer"
          >
            Save Preferences ✓
          </button>
        </div>
      </div>
    </div>
  );
}

