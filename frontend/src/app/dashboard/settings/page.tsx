'use client';

export default function SettingsPage() {
  return (
    <div className="bg-white rounded-2xl border border-teal-100/80 p-8 shadow-xs">
      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
        Account & Preferences
      </span>
      <h1 className="text-2xl font-bold text-gray-800 mt-3 mb-2">Platform Settings</h1>
      <p className="text-xs text-gray-500 mb-6">
        Manage profile details, notification preferences, privacy, and authorized caregivers.
      </p>
    </div>
  );
}

