'use client';

import React, { useState } from 'react';
import type { ClinicalNoteItem, DoctorPatientItem } from '../types/doctor.types';

interface Props {
  isOpen: boolean;
  patients: DoctorPatientItem[];
  onClose: () => void;
  onSaveNote: (noteData: Partial<ClinicalNoteItem>) => void;
}

export default function AddClinicalNoteModal({
  isOpen,
  patients,
  onClose,
  onSaveNote,
}: Props) {
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patients[0]?.id ?? '');
  const [category, setCategory] = useState<ClinicalNoteItem['category']>('Consultation');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [recommendation, setRecommendation] = useState('');

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    const pat = patients.find(p => p.id === selectedPatientId) || patients[0];

    onSaveNote({
      patientId: pat?.id,
      patientName: pat?.name,
      patientCode: pat?.patientCode,
      category,
      title: title.trim(),
      content: content.trim(),
      recommendations: recommendation ? [recommendation.trim()] : [],
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100 dark:border-[#154c40] p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-[#154c40] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-[#0d3b32] text-[#0d9488] flex items-center justify-center font-bold text-sm">
              📝
            </span>
            <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
              Create Clinical Consultation Note
            </h3>
          </div>
          <button type="button" onClick={onClose} className="w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 flex items-center justify-center">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-200 mb-1">Select Patient</label>
              <select
                value={selectedPatientId}
                onChange={e => setSelectedPatientId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-gray-800 dark:text-white outline-none"
              >
                {patients.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.patientCode})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-200 mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as ClinicalNoteItem['category'])}
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-gray-800 dark:text-white outline-none"
              >
                <option value="Consultation">Consultation</option>
                <option value="Observation">Observation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Care-plan review">Care-plan review</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-200 mb-1">Note Title / Subject</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Cognitive Screening Review & Medication Tolerance"
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-gray-800 dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-200 mb-1">Clinical Observations &amp; Findings</label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Record clinical impressions, reported symptoms, caregiver inputs, and cognitive assessment context..."
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-gray-800 dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-200 mb-1">Primary Recommendation / Action</label>
            <input
              type="text"
              value={recommendation}
              onChange={e => setRecommendation(e.target.value)}
              placeholder="e.g. Repeat MMSE in 30 days, maintain Donepezil 5mg"
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] bg-white dark:bg-[#0d2e27] text-gray-800 dark:text-white outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-[#154c40]">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border text-gray-600 dark:text-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#0d9488] hover:bg-[#0b8075] text-white font-bold cursor-pointer">
              Save Clinical Note ✓
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

