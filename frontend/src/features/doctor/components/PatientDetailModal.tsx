'use client';

import React, { useState } from 'react';
import type { DoctorPatientItem } from '../types/doctor.types';

interface Props {
  isOpen: boolean;
  patient: DoctorPatientItem | null;
  onClose: () => void;
  onScheduleApt?: (patient: DoctorPatientItem) => void;
}

export default function PatientDetailModal({
  isOpen,
  patient,
  onClose,
  onScheduleApt,
}: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'medical' | 'caregiver'>('overview');

  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100 dark:border-[#154c40] p-5 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 dark:border-[#154c40] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-[#0e3a31] text-[#0d9488] dark:text-[#2dd4bf] font-bold text-base flex items-center justify-center shrink-0">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white">
                  {patient.name}
                </h2>
                <span className="font-mono text-xs text-gray-400 bg-gray-100 dark:bg-[#0e352d] px-2 py-0.5 rounded">
                  {patient.patientCode}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {patient.gender} • {patient.age} yrs • DOB: {patient.dob}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-gray-100 dark:border-[#154c40] pb-2 text-xs">
          {(['overview', 'medical', 'caregiver'] as const).map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer capitalize ${
                activeTab === tab
                  ? 'bg-[#0d9488] text-white shadow-xs'
                  : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-[#124138]'
              }`}
            >
              {tab === 'medical' ? 'Medical History' : tab === 'caregiver' ? 'Primary Caregiver' : 'Patient Overview'}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-gray-50 dark:bg-[#071f1a] border border-gray-100 dark:border-[#154c40]">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Record Status</span>
                <p className="text-sm font-extrabold text-teal-800 dark:text-teal-300 mt-0.5">{patient.status}</p>
              </div>
              <div className="p-3 rounded-2xl bg-gray-50 dark:bg-[#071f1a] border border-gray-100 dark:border-[#154c40]">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Assigned Since</span>
                <p className="text-sm font-extrabold text-gray-800 dark:text-white mt-0.5">{patient.assignedDate}</p>
              </div>
            </div>

            {patient.latestMmseScore && (
              <div className="p-4 rounded-2xl bg-teal-50 dark:bg-[#0d3b32] border border-teal-100 dark:border-[#154c40] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-teal-800 dark:text-teal-300 font-bold uppercase">Latest Cognitive Score</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-black text-[#0a3832] dark:text-white">{patient.latestMmseScore.score} / {patient.latestMmseScore.total}</span>
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">({patient.latestMmseScore.clinicalRange})</span>
                  </div>
                  <span className="text-[10px] text-gray-500">Evaluated on {patient.latestMmseScore.date}</span>
                </div>
                <span className="w-10 h-10 rounded-full bg-white dark:bg-[#0c2b24] text-teal-600 flex items-center justify-center text-lg shadow-xs">
                  ★
                </span>
              </div>
            )}

            <div className="space-y-1">
              <span className="font-bold text-gray-700 dark:text-gray-200">Contact Information</span>
              <p className="text-gray-600 dark:text-gray-300">Phone: {patient.contactPhone} • Email: {patient.email}</p>
            </div>
          </div>
        )}

        {/* Tab 2: Medical History */}
        {activeTab === 'medical' && (
          <div className="space-y-3 text-xs">
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-200 block mb-1.5">Diagnosed Conditions</span>
              <div className="flex flex-wrap gap-1.5">
                {patient.medicalConditions.map(c => (
                  <span key={c} className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-[#0e352d] text-gray-800 dark:text-gray-200 font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-bold text-gray-700 dark:text-gray-200 block mb-1.5">Current Medication Regimen</span>
              <div className="flex flex-wrap gap-1.5">
                {patient.currentMedications.map(m => (
                  <span key={m} className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-[#0d3b32] text-teal-900 dark:text-teal-200 font-medium border border-teal-100">
                    💊 {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Primary Caregiver */}
        {activeTab === 'caregiver' && (
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#071f1a] border border-gray-100 dark:border-[#154c40] space-y-2 text-xs">
            <h3 className="font-bold text-gray-800 dark:text-white text-sm">
              {patient.primaryCaregiver.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Relationship: <strong>{patient.primaryCaregiver.relationship}</strong>
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Emergency Contact: <strong>{patient.primaryCaregiver.phone}</strong>
            </p>
            <span className="inline-block mt-2 text-[10.5px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
              ✔ Verified Primary Contact
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-[#154c40]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-[#19584b] text-gray-600 dark:text-gray-300 text-xs font-semibold"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onScheduleApt?.(patient);
            }}
            className="px-4 py-2 rounded-xl bg-[#0d9488] hover:bg-[#0b8075] text-white text-xs font-bold"
          >
            Schedule Consultation &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

