'use client';

import React, { useState } from 'react';
import { useDoctor } from '../hooks/useDoctor';
import { PatientDetailModal, NewPatientModal, ScheduleAppointmentModal } from '../components';

export default function DoctorPatientsScreen() {
  const {
    data,
    searchQuery,
    setSearchQuery,
    selectedPatient,
    isPatientModalOpen,
    setIsPatientModalOpen,
    isNewPatientModalOpen,
    setIsNewPatientModalOpen,
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    handleOpenPatientDetail,
    handleRegisterPatient,
    handleScheduleAppointment,
  } = useDoctor();

  const [statusFilter, setStatusFilter] = useState<string>('All');

  if (!data) return null;

  const filteredPatients = data.patientsList.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.patientCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a3832] dark:text-white tracking-tight">
            Assigned Patients Directory
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage your patient records, medical history, and cognitive monitoring ({data.patientsList.length} patients)
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsNewPatientModalOpen(true)}
          className="px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8075] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>+</span>
          <span>Register Patient</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#0c2b24] p-4 rounded-2xl border border-teal-100/80 dark:border-[#154c40] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'Active', 'Stable', 'Needs Follow-up', 'Under Evaluation'] as const).map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                statusFilter === tab
                  ? 'bg-[#0d9488] text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-[#071f1a] text-gray-600 dark:text-gray-300 hover:bg-teal-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by patient name or code..."
            className="w-full sm:w-64 pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-gray-50 dark:bg-[#071f1a] text-xs outline-none focus:border-[#0d9488]"
          />
          <span className="absolute left-2.5 top-2 text-xs text-gray-400">🔍</span>
        </div>
      </div>

      {/* Patients Table / Grid */}
      <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-5 shadow-xs overflow-x-auto">
        <table className="min-w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-100 dark:border-[#154c40] text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider">
              <th className="py-3 px-3">Patient</th>
              <th className="py-3 px-3">Age / Gender</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Latest MMSE</th>
              <th className="py-3 px-3">Primary Caregiver</th>
              <th className="py-3 px-3">Next Action</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-[#154c40]">
            {filteredPatients.map(pat => (
              <tr key={pat.id} className="hover:bg-teal-50/40 dark:hover:bg-[#071f1a] transition">
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-[#0d3b32] text-[#0d9488] font-bold flex items-center justify-center shrink-0">
                      {pat.name[0]}
                    </div>
                    <div>
                      <span className="font-extrabold text-gray-900 dark:text-white block">
                        {pat.name}
                      </span>
                      <span className="font-mono text-[10.5px] text-gray-400">{pat.patientCode}</span>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-3 text-gray-600 dark:text-gray-300">
                  {pat.age} yrs • {pat.gender}
                </td>

                <td className="py-3.5 px-3">
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      pat.status === 'Needs Follow-up'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300'
                        : pat.status === 'Under Evaluation'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300'
                    }`}
                  >
                    {pat.status}
                  </span>
                </td>

                <td className="py-3.5 px-3">
                  {pat.latestMmseScore ? (
                    <div>
                      <span className="font-extrabold text-[#0a3832] dark:text-teal-200">
                        {pat.latestMmseScore.score}/{pat.latestMmseScore.total}
                      </span>
                      <span className="text-[10px] text-gray-400 block">{pat.latestMmseScore.clinicalRange}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">No score yet</span>
                  )}
                </td>

                <td className="py-3.5 px-3">
                  <span className="font-semibold text-gray-800 dark:text-white block">{pat.primaryCaregiver.name}</span>
                  <span className="text-[10px] text-gray-400">{pat.primaryCaregiver.relationship}</span>
                </td>

                <td className="py-3.5 px-3 text-teal-700 dark:text-teal-300 font-medium">
                  {pat.nextFollowUpDate || 'None scheduled'}
                </td>

                <td className="py-3.5 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => handleOpenPatientDetail(pat)}
                    className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-[#19584b] text-xs font-semibold text-[#0d9488] hover:bg-teal-50 dark:hover:bg-[#124138] cursor-pointer"
                  >
                    View Profile &rarr;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PatientDetailModal
        isOpen={isPatientModalOpen}
        patient={selectedPatient}
        onClose={() => setIsPatientModalOpen(false)}
        onScheduleApt={() => setIsScheduleModalOpen(true)}
      />

      <NewPatientModal
        isOpen={isNewPatientModalOpen}
        onClose={() => setIsNewPatientModalOpen(false)}
        onRegister={handleRegisterPatient}
      />

      <ScheduleAppointmentModal
        isOpen={isScheduleModalOpen}
        patients={data.patientsList}
        preselectedPatient={selectedPatient}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleScheduleAppointment}
      />
    </div>
  );
}

