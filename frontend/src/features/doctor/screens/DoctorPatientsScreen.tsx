'use client';

import React, { useState } from 'react';
import { useDoctor } from '../hooks/useDoctor';
import { PatientDetailModal, NewPatientModal, ScheduleAppointmentModal } from '../components';

const statusColors: Record<string, string> = {
  'Needs Follow-up': 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
  'Under Evaluation': 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
  'Active': 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
  'Stable': 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
};

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

      {/* ── Header ── */}
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

      {/* ── Filter + Search Bar ── */}
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

      {/* ── Patient Cards Grid ── */}
      {filteredPatients.length === 0 ? (
        <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-14 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-[#0d3b32] text-teal-600 dark:text-teal-300 text-2xl flex items-center justify-center mx-auto mb-3">
            🔍
          </div>
          <h3 className="text-base font-bold text-gray-800 dark:text-white">No patients found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
            Try adjusting your search terms or filter selection.
          </p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setStatusFilter('All'); }}
            className="mt-4 px-4 py-2 bg-teal-50 dark:bg-[#124138] hover:bg-teal-100 text-teal-800 dark:text-teal-200 text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPatients.map(pat => (
            <div
              key={pat.id}
              className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-5 shadow-xs hover:shadow-md hover:border-teal-300 dark:hover:border-teal-500/50 transition-all flex flex-col gap-4 group"
            >
              {/* ── Top: Avatar + Name + Status ── */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-[#0d3b32] text-[#0d9488] dark:text-teal-300 font-extrabold text-base flex items-center justify-center shrink-0">
                    {pat.name[0]}
                  </div>
                  <div>
                    <p className="font-extrabold text-sm text-gray-900 dark:text-white leading-tight group-hover:text-[#0d9488] transition-colors">
                      {pat.name}
                    </p>
                    <p className="font-mono text-[10.5px] text-gray-400 mt-0.5">{pat.patientCode}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 mt-0.5 ${statusColors[pat.status] ?? 'bg-gray-100 text-gray-600'}`}>
                  {pat.status}
                </span>
              </div>

              {/* ── Info Grid: Age/Gender + MMSE ── */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-2xl bg-teal-50/60 dark:bg-[#071f1a] border border-teal-100/60 dark:border-[#154c40]">
                  <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">Age / Gender</p>
                  <p className="text-xs font-bold text-gray-800 dark:text-teal-100">
                    {pat.age} yrs • {pat.gender}
                  </p>
                </div>
                <div className="p-2.5 rounded-2xl bg-teal-50/60 dark:bg-[#071f1a] border border-teal-100/60 dark:border-[#154c40]">
                  <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">MMSE Score</p>
                  {pat.latestMmseScore ? (
                    <>
                      <p className="text-xs font-extrabold text-[#0a3832] dark:text-teal-200">
                        {pat.latestMmseScore.score}/{pat.latestMmseScore.total}
                      </p>
                      <p className="text-[9px] text-gray-400 leading-tight">{pat.latestMmseScore.clinicalRange}</p>
                    </>
                  ) : (
                    <p className="text-xs text-gray-400 italic">No score</p>
                  )}
                </div>
              </div>

              {/* ── Family Contact ── */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-gray-50 dark:bg-[#071f1a] border border-gray-100 dark:border-[#154c40]">
                <span className="text-sm shrink-0">👤</span>
                <div className="min-w-0">
                  <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Family Contact</p>
                  <p className="text-xs font-bold text-gray-800 dark:text-white truncate">{pat.primaryCaregiver.name}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{pat.primaryCaregiver.relationship}</p>
                </div>
              </div>

              {/* ── Next Action ── */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-teal-50/60 dark:bg-[#071f1a] border border-teal-100/60 dark:border-[#154c40]">
                <span className="text-sm shrink-0">📅</span>
                <div>
                  <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Next Action</p>
                  <p className="text-xs font-bold text-teal-700 dark:text-teal-300">{pat.nextFollowUpDate || 'Not scheduled'}</p>
                </div>
              </div>

              {/* ── Action Buttons ── */}
              <div className="flex gap-2 mt-auto">
                <button
                  type="button"
                  onClick={() => handleOpenPatientDetail(pat)}
                  className="flex-1 py-2.5 rounded-xl bg-[#0d9488] hover:bg-[#0b8075] text-white text-xs font-bold transition cursor-pointer shadow-xs"
                >
                  View Profile →
                </button>
                <button
                  type="button"
                  onClick={() => { handleOpenPatientDetail(pat); setIsScheduleModalOpen(true); }}
                  className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] text-base hover:bg-teal-50 dark:hover:bg-[#124138] cursor-pointer transition"
                  title="Schedule Appointment"
                >
                  🗓️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Modals ── */}
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
