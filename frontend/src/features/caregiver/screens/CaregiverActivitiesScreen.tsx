'use client';

import { useState } from 'react';
import { useCaregiver } from '../hooks/useCaregiver';

interface Activity {
  id: string;
  name: string;
  patientName: string;
  patientCode: string;
  dueTime: string;
  category: 'Cognitive' | 'Physical' | 'Medication' | 'Wellness';
  completed: boolean;
}

const mockActivities: Activity[] = [
  { id: 'a1', name: 'Memory Exercise', patientName: 'Alex Parker', patientCode: 'CC-00258', dueTime: '10:00 AM', category: 'Cognitive', completed: false },
  { id: 'a2', name: 'Morning Walk', patientName: 'Alex Parker', patientCode: 'CC-00258', dueTime: '08:30 AM', category: 'Physical', completed: true },
  { id: 'a3', name: 'Medication Reminder', patientName: 'Eleanor Vance', patientCode: 'CC-00142', dueTime: '09:00 AM', category: 'Medication', completed: false },
  { id: 'a4', name: 'Word Puzzle', patientName: 'Eleanor Vance', patientCode: 'CC-00142', dueTime: '11:00 AM', category: 'Cognitive', completed: false },
  { id: 'a5', name: 'Evening Check-in', patientName: 'Alex Parker', patientCode: 'CC-00258', dueTime: '06:00 PM', category: 'Wellness', completed: false },
  { id: 'a6', name: 'Relaxation Exercise', patientName: 'Eleanor Vance', patientCode: 'CC-00142', dueTime: '03:00 PM', category: 'Wellness', completed: true },
];

const categoryColors: Record<string, string> = {
  Cognitive: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  Physical: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Medication: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  Wellness: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
};

const categoryIcons: Record<string, string> = {
  Cognitive: '🧠',
  Physical: '🏃',
  Medication: '💊',
  Wellness: '🌿',
};

type FilterType = 'Today' | 'All' | 'Completed';

export default function CaregiverActivitiesScreen() {
  useCaregiver();
  const [filter, setFilter] = useState<FilterType>('Today');
  const [assisted, setAssisted] = useState<Set<string>>(new Set());

  const filtered = mockActivities.filter((a) => {
    if (filter === 'Completed') return a.completed || assisted.has(a.id);
    if (filter === 'Today') return true;
    return true;
  });

  const handleAssist = (id: string, name: string) => {
    setAssisted((prev) => new Set(prev).add(id));
    window.alert(`Recorded caregiver support for: ${name}`);
  };

  return (
    <div className="min-h-screen bg-[#ecf7f5] dark:bg-[#061815] p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-white dark:bg-[#0c2b24] p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">Daily Activities</h1>
            <p className="text-sm text-gray-500 dark:text-teal-300 mt-1">Support your patient&apos;s daily routines</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-[#154c40] flex items-center justify-center text-2xl flex-shrink-0">
            ⚡
          </div>
        </div>

        {/* Note */}
        <div className="mt-4 rounded-2xl bg-teal-50 dark:bg-[#154c40] p-3">
          <p className="text-xs text-teal-700 dark:text-teal-300">
            ℹ️ Marking as assisted records caregiver support, not patient completion.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {(['Today', 'All', 'Completed'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              filter === f
                ? 'bg-[#0d9488] text-white shadow-md'
                : 'bg-white dark:bg-[#0c2b24] text-gray-600 dark:text-teal-200 hover:bg-teal-50 dark:hover:bg-[#154c40]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Activity Cards */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl bg-white dark:bg-[#0c2b24] p-10 text-center text-gray-400 dark:text-teal-400">
          <p className="text-4xl mb-3">✅</p>
          <p className="font-semibold">No activities to show</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((activity) => {
            const isDone = activity.completed || assisted.has(activity.id);
            return (
              <div
                key={activity.id}
                className={`rounded-3xl bg-white dark:bg-[#0c2b24] p-5 shadow-sm flex flex-col gap-3 ${
                  isDone ? 'opacity-70' : ''
                }`}
              >
                {/* Title + category */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{categoryIcons[activity.category]}</span>
                    <h3 className="font-extrabold text-gray-800 dark:text-white">{activity.name}</h3>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${categoryColors[activity.category]}`}>
                    {activity.category}
                  </span>
                </div>

                {/* Patient info */}
                <div>
                  <p className="text-sm text-gray-600 dark:text-teal-200 font-medium">{activity.patientName}</p>
                  <p className="text-xs font-mono text-gray-400 dark:text-teal-400">{activity.patientCode}</p>
                </div>

                {/* Due time */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 dark:text-teal-400">⏰ Due:</span>
                  <span className="text-sm font-semibold text-gray-700 dark:text-teal-200">{activity.dueTime}</span>
                </div>

                {/* Button */}
                {isDone ? (
                  <div className="mt-auto w-full py-2 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold text-center">
                    Completed ✓
                  </div>
                ) : (
                  <button
                    onClick={() => handleAssist(activity.id, activity.name)}
                    className="mt-auto w-full py-2 rounded-xl bg-[#0d9488] text-white text-sm font-semibold hover:bg-[#0f766e] transition-colors"
                  >
                    Mark as Assisted
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

