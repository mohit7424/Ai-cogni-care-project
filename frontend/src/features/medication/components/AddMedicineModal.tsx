'use client';

import React, { useState } from 'react';
import type { MedicationDoseItem } from '../types/medication.types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (dose: Omit<MedicationDoseItem, 'id'>) => void;
}

export default function AddMedicineModal({ isOpen, onClose, onAdd }: Props) {
  const [name, setName] = useState('');
  const [timeFormatted, setTimeFormatted] = useState('12:00');
  const [dosageDetails, setDosageDetails] = useState('1 Tablet • Afternoon dose');
  const [instructions, setInstructions] = useState('Take with meal and water');
  const [period, setPeriod] = useState<MedicationDoseItem['period']>('afternoon');

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      timeFormatted,
      dosageDetails,
      instructions,
      status: 'pending',
      period,
    });

    setName('');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-teal-100 shadow-xl max-w-md w-full p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">💊</span>
            <h3 className="text-lg font-bold text-gray-900">Add New Medication</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-lg font-bold cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Medication Name & Strength
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Omega-3 Fish Oil (1000 mg)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#0d9488] focus:ring-2 focus:ring-teal-100 outline-none text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Scheduled Time
              </label>
              <input
                type="text"
                required
                value={timeFormatted}
                onChange={e => setTimeFormatted(e.target.value)}
                placeholder="e.g. 12:00 or 06:30"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#0d9488] focus:ring-2 focus:ring-teal-100 outline-none text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Dose Period
              </label>
              <select
                value={period}
                onChange={e => setPeriod(e.target.value as MedicationDoseItem['period'])}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#0d9488] focus:ring-2 focus:ring-teal-100 outline-none text-xs bg-white"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Dosage Subtext
            </label>
            <input
              type="text"
              value={dosageDetails}
              onChange={e => setDosageDetails(e.target.value)}
              placeholder="e.g. 1 Capsule • Morning dose"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#0d9488] focus:ring-2 focus:ring-teal-100 outline-none text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Special Instructions
            </label>
            <input
              type="text"
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              placeholder="e.g. Take with meal or water after breakfast"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#0d9488] focus:ring-2 focus:ring-teal-100 outline-none text-xs"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded-xl text-gray-600 font-semibold hover:bg-gray-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-5 bg-[#0d9488] hover:bg-[#0b8075] text-white font-bold rounded-xl shadow-xs transition cursor-pointer"
            >
              Save Medicine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

