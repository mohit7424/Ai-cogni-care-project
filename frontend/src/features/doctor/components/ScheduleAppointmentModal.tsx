'use client';

import React, { useState } from 'react';
import type { DoctorAppointmentItem, DoctorPatientItem } from '../types/doctor.types';

interface Props {
  isOpen: boolean;
  patients: DoctorPatientItem[];
  preselectedPatient?: DoctorPatientItem | null;
  onClose: () => void;
  onSchedule: (aptData: Partial<DoctorAppointmentItem>) => void;
}

export default function ScheduleAppointmentModal({
  isOpen,
  patients,
  preselectedPatient,
  onClose,
  onSchedule,
}: Props) {
  const [selectedPatientId, setSelectedPatientId] = useState<string>(
    preselectedPatient?.id || (patients[0]?.id ?? '')
  );
  const [timeFormatted, setTimeFormatted] = useState('11:00 AM');
  const [date, setDate] = useState('Today');
  const [duration, setDuration] = useState<number>(30);
  const [type, setType] = useState<DoctorAppointmentItem['type']>('In-Person Consultation');
  const [reason, setReason] = useState('Routine cognitive follow-up & assessment review');

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const pat = patients.find(p => p.id === selectedPatientId) || patients[0];

    onSchedule({
      patientId: pat?.id,
      patientName: pat?.name,
      patientCode: pat?.patientCode,
      timeFormatted,
      date,
      durationMinutes: duration,
      type,
      reason,
      status: 'Confirmed',
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100 dark:border-[#154c40] p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-[#154c40] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-[#0d3b32] text-[#0d9488] flex items-center justify-center font-bold text-sm">
              📅
            </span>
            <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
              Schedule Consultation
            </h3>
          </div>
          <button type="button" onClick={onClose} className="w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 flex items-center justify-center">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-200 mb-1">Select Patient</label>
            <select
              value={selectedPatientId}
              onChange={e => setSelectedPatientId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-gray-800 dark:text-white outline-none"
            >
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.patientCode}) • {p.age} yrs
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-200 mb-1">Date</label>
              <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-gray-800 dark:text-white outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-200 mb-1">Time Slot</label>
              <input
                type="text"
                value={timeFormatted}
                onChange={e => setTimeFormatted(e.target.value)}
                placeholder="e.g. 11:30 AM"
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-gray-800 dark:text-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-200 mb-1">Consultation Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as DoctorAppointmentItem['type'])}
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-gray-800 dark:text-white outline-none"
              >
                <option value="In-Person Consultation">In-Person Consultation</option>
                <option value="Cognitive Follow-up">Cognitive Follow-up</option>
                <option value="Assessment Review">Assessment Review</option>
                <option value="Tele-consult">Tele-consult</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-200 mb-1">Duration</label>
              <select
                value={duration}
                onChange={e => setDuration(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-gray-800 dark:text-white outline-none"
              >
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-200 mb-1">Clinical Reason / Focus</label>
            <input
              type="text"
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-gray-800 dark:text-white outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-[#154c40]">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border text-gray-600 dark:text-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#0d9488] hover:bg-[#0b8075] text-white font-bold cursor-pointer">
              Book Appointment ✓
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

