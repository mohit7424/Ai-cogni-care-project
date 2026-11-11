'use client';

import { useCaregiver } from '../hooks/useCaregiver';

interface Appointment {
  id: string;
  patientName: string;
  patientInitials: string;
  doctorName: string;
  dateTime: string;
  method: string;
  status: 'Confirmed' | 'Scheduled' | 'Pending';
}

interface FollowUp {
  id: string;
  text: string;
}

const mockAppointments: Appointment[] = [
  {
    id: 'appt1',
    patientName: 'Alex Parker',
    patientInitials: 'AP',
    doctorName: 'Dr. Sarah Jenkins',
    dateTime: '14 Nov 2026 · 10:30 AM',
    method: 'In-person',
    status: 'Confirmed',
  },
  {
    id: 'appt2',
    patientName: 'Eleanor Vance',
    patientInitials: 'EV',
    doctorName: 'Dr. Sarah Jenkins',
    dateTime: '18 Nov 2026 · 02:00 PM',
    method: 'Video Call',
    status: 'Scheduled',
  },
  {
    id: 'appt3',
    patientName: 'Alex Parker',
    patientInitials: 'AP',
    doctorName: 'Dr. Priya Mehta',
    dateTime: '25 Nov 2026 · 11:00 AM',
    method: 'In-person',
    status: 'Pending',
  },
];

const mockFollowUps: FollowUp[] = [
  { id: 'fu1', text: 'Eleanor Vance: Schedule MRI follow-up' },
  { id: 'fu2', text: 'Alex Parker: Confirm medication adherence review' },
];

const statusConfig = {
  Confirmed: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Scheduled: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
};

const methodConfig: Record<string, string> = {
  'In-person': 'bg-teal-100 text-teal-700 dark:bg-[#154c40] dark:text-teal-300',
  'Video Call': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  'Phone Call': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
};

export default function CaregiverAppointmentsScreen() {
  useCaregiver();

  return (
    <div className="min-h-screen bg-[#ecf7f5] dark:bg-[#061815] p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-white dark:bg-[#0c2b24] p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">Appointments &amp; Follow-ups</h1>
          <p className="text-sm text-gray-500 dark:text-teal-300 mt-1">Upcoming appointments for your linked patients</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-[#154c40] flex items-center justify-center text-2xl flex-shrink-0">
          📅
        </div>
      </div>

      {/* Upcoming Appointments */}
      <section>
        <h2 className="text-lg font-extrabold text-gray-800 dark:text-white mb-4">Upcoming Appointments</h2>
        {mockAppointments.length === 0 ? (
          <div className="rounded-3xl bg-white dark:bg-[#0c2b24] p-10 text-center text-gray-400 dark:text-teal-400">
            <p className="text-4xl mb-3">📅</p>
            <p className="font-semibold">No upcoming appointments</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mockAppointments.map((appt) => (
              <div key={appt.id} className="rounded-3xl bg-white dark:bg-[#0c2b24] p-5 shadow-sm flex flex-col gap-4">
                {/* Patient avatar + name */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-teal-100 dark:bg-[#154c40] flex items-center justify-center font-extrabold text-[#0d9488] flex-shrink-0">
                    {appt.patientInitials}
                  </div>
                  <div>
                    <p className="font-extrabold text-gray-800 dark:text-white">{appt.patientName}</p>
                    <p className="text-xs text-gray-500 dark:text-teal-300">{appt.doctorName}</p>
                  </div>
                </div>

                {/* Date/time */}
                <div className="rounded-2xl bg-[#ecf7f5] dark:bg-[#154c40] p-3">
                  <p className="text-xs text-gray-400 dark:text-teal-400">Date &amp; Time</p>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm mt-0.5">{appt.dateTime}</p>
                </div>

                {/* Method + Status badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${methodConfig[appt.method] ?? 'bg-gray-100 text-gray-600'}`}>
                    {appt.method}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusConfig[appt.status]}`}>
                    {appt.status}
                  </span>
                </div>

                {/* Set reminder button */}
                <button
                  onClick={() => window.alert(`Reminder set for ${appt.patientName}'s appointment on ${appt.dateTime}`)}
                  className="mt-auto w-full py-2 rounded-xl bg-[#0d9488] text-white text-sm font-semibold hover:bg-[#0f766e] transition-colors"
                >
                  Set Reminder
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Follow-up Tasks */}
      <section>
        <h2 className="text-lg font-extrabold text-gray-800 dark:text-white mb-3">📌 Follow-up Tasks</h2>
        <div className="rounded-3xl bg-white dark:bg-[#0c2b24] divide-y divide-gray-100 dark:divide-[#154c40] shadow-sm overflow-hidden">
          {mockFollowUps.map((task) => (
            <div key={task.id} className="flex items-center gap-3 p-4">
              <span className="w-2 h-2 rounded-full bg-[#0d9488] flex-shrink-0" />
              <p className="text-sm text-gray-700 dark:text-teal-200">{task.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

