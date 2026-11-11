'use client';

import { useCaregiver } from '../hooks/useCaregiver';

export default function CaregiverSafetyScreen() {
  const { data } = useCaregiver();
  const alerts = data.activeAlerts;

  return (
    <div className="min-h-screen bg-[#ecf7f5] dark:bg-[#061815] p-4 md:p-6 space-y-6">
      <div className="rounded-3xl bg-white dark:bg-[#0c2b24] p-5 shadow-sm">
        <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">Safety Alerts</h1>
        <p className="text-sm text-gray-500 dark:text-teal-300 mt-1">
          Review active safety notifications for your linked patients
        </p>
      </div>

      {alerts.length === 0 ? (
        <div className="rounded-3xl bg-white dark:bg-[#0c2b24] p-8 text-center text-gray-500 dark:text-teal-300">
          No active safety alerts.
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className="rounded-3xl bg-white dark:bg-[#0c2b24] border-l-4 border-red-500 p-5 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h2 className="font-extrabold text-gray-800 dark:text-white">{alert.patientName}</h2>
                <span className="text-xs font-bold uppercase text-red-600 dark:text-red-300">
                  {alert.severity} priority
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{alert.alertType}</p>
              <p className="text-xs text-gray-400 dark:text-teal-400 mt-2">{alert.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
