'use client';

import { useCaregiver } from '../hooks/useCaregiver';

interface Medication {
  id: string;
  name: string;
  dose: string;
  patientName: string;
  scheduledTime: string;
  frequency: string;
  status: 'Confirmed' | 'Pending' | 'Missed';
}

const mockMedications: Medication[] = [
  { id: 'm1', name: 'Donepezil', dose: '5mg', patientName: 'Alex Parker', scheduledTime: '08:00 AM', frequency: 'Daily', status: 'Confirmed' },
  { id: 'm2', name: 'Memantine', dose: '10mg', patientName: 'Alex Parker', scheduledTime: '08:00 PM', frequency: 'Daily', status: 'Pending' },
  { id: 'm3', name: 'Aricept', dose: '5mg', patientName: 'Eleanor Vance', scheduledTime: '09:00 AM', frequency: 'Daily', status: 'Missed' },
  { id: 'm4', name: 'Vitamin D3', dose: '1000 IU', patientName: 'Eleanor Vance', scheduledTime: '06:00 PM', frequency: 'Daily', status: 'Pending' },
];

const statusConfig = {
  Confirmed: {
    badge: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    card: 'border-green-200 dark:border-green-800',
    icon: '✅',
  },
  Pending: {
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    card: 'border-amber-200 dark:border-amber-700',
    icon: '⏳',
  },
  Missed: {
    badge: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    card: 'border-red-300 dark:border-red-600',
    icon: '❌',
  },
};

export default function CaregiverMedicationScreen() {
  useCaregiver();

  return (
    <div className="min-h-screen bg-[#ecf7f5] dark:bg-[#061815] p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-white dark:bg-[#0c2b24] p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">Medication Support</h1>
            <p className="text-sm text-gray-500 dark:text-teal-300 mt-1">
              Medication information is view-only. Changes require a prescriber.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-[#154c40] flex items-center justify-center text-2xl flex-shrink-0">
            💊
          </div>
        </div>

        {/* Important note */}
        <div className="mt-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 p-3">
          <p className="text-xs text-red-700 dark:text-red-300 font-semibold">
            ⚠️ Caregiver can only send reminders. Only a qualified prescriber can change medication or dosage.
          </p>
        </div>
      </div>

      {/* Today's Schedule */}
      <div>
        <h2 className="text-lg font-extrabold text-gray-800 dark:text-white mb-4">📅 Today&apos;s Schedule</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockMedications.map((med) => {
            const config = statusConfig[med.status];
            return (
              <div
                key={med.id}
                className={`rounded-3xl bg-white dark:bg-[#0c2b24] border-2 ${config.card} p-5 shadow-sm flex flex-col gap-3`}
              >
                {/* Med name + status */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-gray-800 dark:text-white">{med.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-teal-300 font-medium">{med.dose}</p>
                  </div>
                  <span className="text-xl">{config.icon}</span>
                </div>

                {/* Patient */}
                <p className="text-sm text-gray-600 dark:text-teal-200">
                  <span className="text-gray-400 dark:text-teal-400">Patient: </span>
                  {med.patientName}
                </p>

                {/* Time + frequency */}
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-xs text-gray-400 dark:text-teal-400 block">Time</span>
                    <span className="font-semibold text-gray-700 dark:text-white">{med.scheduledTime}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 dark:text-teal-400 block">Frequency</span>
                    <span className="font-semibold text-gray-700 dark:text-white">{med.frequency}</span>
                  </div>
                </div>

                {/* Status badge */}
                <span className={`self-start text-xs px-3 py-1 rounded-full font-semibold ${config.badge}`}>
                  {med.status}
                </span>

                {/* Send reminder button for Pending/Missed */}
                {(med.status === 'Pending' || med.status === 'Missed') && (
                  <button
                    onClick={() => window.alert(`Reminder sent to ${med.patientName} for ${med.name} ${med.dose}`)}
                    className="w-full py-2 rounded-xl bg-[#0d9488] text-white text-sm font-semibold hover:bg-[#0f766e] transition-colors mt-auto"
                  >
                    Send Reminder
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Important note box */}
      <div className="rounded-3xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">ℹ️</span>
          <div>
            <h3 className="font-extrabold text-amber-800 dark:text-amber-200 mb-1">Important Notice</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Caregiver can only send reminders. Only a qualified prescriber can change medication or dosage.
              If you have concerns about a patient&apos;s medication, please contact their treating physician directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

