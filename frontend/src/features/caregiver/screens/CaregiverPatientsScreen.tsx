'use client';

import { useCaregiver } from '../hooks/useCaregiver';

export default function CaregiverPatientsScreen() {
  const { data, setSelectedPatientId } = useCaregiver();

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    revoked: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
  };

  const mmseColors = (score: number, total: number) => {
    const pct = score / total;
    if (pct >= 0.9) return 'text-green-600 dark:text-green-400';
    if (pct >= 0.73) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="min-h-screen bg-[#ecf7f5] dark:bg-[#061815] p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-white dark:bg-[#0c2b24] p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">My Linked Patients</h1>
          <p className="text-sm text-gray-500 dark:text-teal-300 mt-1">
            {data.linkedPatients.length} patient{data.linkedPatients.length !== 1 ? 's' : ''} linked to your account
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-[#154c40] flex items-center justify-center text-2xl">
          👥
        </div>
      </div>

      {/* Patient Grid */}
      {data.linkedPatients.length === 0 ? (
        <div className="rounded-3xl bg-white dark:bg-[#0c2b24] p-10 text-center text-gray-400 dark:text-teal-400">
          <p className="text-4xl mb-3">👤</p>
          <p className="font-semibold">No linked patients yet</p>
          <p className="text-sm mt-1">Contact your care coordinator to link patients.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.linkedPatients.map((patient) => (
            <div
              key={patient.id}
              className={`rounded-3xl bg-white dark:bg-[#0c2b24] p-5 shadow-sm relative flex flex-col gap-4 ${
                patient.hasAlert ? 'ring-2 ring-red-400 dark:ring-red-500' : ''
              }`}
            >
              {/* Alert dot */}
              {patient.hasAlert && (
                <span className="absolute top-4 right-4 w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              )}

              {/* Avatar + Name */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-[#154c40] flex items-center justify-center text-lg font-extrabold text-[#0d9488] flex-shrink-0">
                  {patient.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <h2 className="font-extrabold text-gray-800 dark:text-white truncate">{patient.name}</h2>
                  <p className="text-xs font-mono text-gray-400 dark:text-teal-400">{patient.patientCode}</p>
                </div>
              </div>

              {/* Relationship badge */}
              <span className="self-start text-xs px-3 py-1 rounded-full bg-teal-100 dark:bg-[#154c40] text-[#0d9488] dark:text-teal-300 font-semibold capitalize">
                {patient.relationship}
              </span>

              {/* Info boxes */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-2xl bg-[#ecf7f5] dark:bg-[#154c40] p-3">
                  <p className="text-xs text-gray-400 dark:text-teal-400">Age / Gender</p>
                  <p className="font-semibold text-gray-700 dark:text-white text-sm mt-0.5">
                    {patient.age} yr · {patient.gender}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#ecf7f5] dark:bg-[#154c40] p-3">
                  <p className="text-xs text-gray-400 dark:text-teal-400">MMSE Score</p>
                  {patient.mmseScore ? (
                    <>
                      <p className={`font-extrabold text-sm mt-0.5 ${mmseColors(patient.mmseScore.score, patient.mmseScore.total)}`}>
                        {patient.mmseScore.score}/{patient.mmseScore.total}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-teal-400">{patient.mmseScore.clinicalRange}</p>
                    </>
                  ) : (
                    <p className="text-xs text-gray-400 dark:text-teal-400 mt-0.5">No score yet</p>
                  )}
                </div>
              </div>

              {/* Status + Cognitive status */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${statusColors[patient.linkStatus]}`}>
                  {patient.linkStatus}
                </span>
                <span className="text-xs text-gray-500 dark:text-teal-300">{patient.cognitiveStatus}</span>
              </div>

              {/* Last activity */}
              <p className="text-xs text-gray-400 dark:text-teal-400">
                Last activity: {patient.lastActivity}
              </p>

              {/* Action buttons */}
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => setSelectedPatientId(patient.id)}
                  className="flex-1 py-2 rounded-xl bg-[#0d9488] text-white text-sm font-semibold hover:bg-[#0f766e] transition-colors"
                >
                  View Details →
                </button>
                <button
                  onClick={() => window.alert(`Schedule appointment for ${patient.name}`)}
                  className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-[#154c40] text-teal-600 dark:text-teal-300 flex items-center justify-center hover:bg-teal-100 transition-colors text-lg flex-shrink-0"
                  title="Schedule appointment"
                >
                  📅
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

