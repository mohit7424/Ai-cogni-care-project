'use client';

import React, { useState } from 'react';
import type { DoctorPatientItem } from '../types/doctor.types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (patientData: Partial<DoctorPatientItem>) => void;
}

export default function NewPatientModal({ isOpen, onClose, onRegister }: Props) {
  const [name, setName] = useState('');
  const [age, setAge] = useState(65);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [phone, setPhone] = useState('');
  const [caregiverName, setCaregiverName] = useState('');
  const [caregiverPhone, setCaregiverPhone] = useState('');

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    onRegister({
      name: name.trim(),
      age: Number(age),
      gender,
      contactPhone: phone || '+91 98000 12345',
      primaryCaregiver: {
        name: caregiverName || 'Primary Family Caregiver',
        relationship: 'Daughter',
        phone: caregiverPhone || '+91 98000 54321',
      },
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100 dark:border-[#154c40] p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-[#154c40] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-[#0d3b32] text-[#0d9488] flex items-center justify-center font-bold text-sm">
              +
            </span>
            <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
              Register New Patient
            </h3>
          </div>
          <button type="button" onClick={onClose} className="w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 flex items-center justify-center">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-200 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Ramesh Chandra"
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-gray-800 dark:text-white outline-none focus:border-[#0d9488]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-200 mb-1">Age</label>
              <input
                type="number"
                min={18}
                max={110}
                value={age}
                onChange={e => setAge(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-gray-800 dark:text-white outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-200 mb-1">Gender</label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value as 'Male' | 'Female' | 'Other')}
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-gray-800 dark:text-white outline-none"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-200 mb-1">Patient Contact Phone</label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+91 98765 00000"
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-gray-800 dark:text-white outline-none"
            />
          </div>

          <div className="pt-1 border-t border-gray-100 dark:border-[#154c40]">
            <span className="block font-bold text-teal-800 dark:text-teal-300 mb-2">Primary Caregiver</span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  value={caregiverName}
                  onChange={e => setCaregiverName(e.target.value)}
                  placeholder="Caregiver Name"
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-gray-800 dark:text-white outline-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={caregiverPhone}
                  onChange={e => setCaregiverPhone(e.target.value)}
                  placeholder="Caregiver Phone"
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-gray-800 dark:text-white outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-[#154c40]">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border text-gray-600 dark:text-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#0d9488] hover:bg-[#0b8075] text-white font-bold cursor-pointer">
              Register Patient ✓
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

