'use client';

import React from 'react';
import { useDoctor } from '../hooks/useDoctor';
import { AddClinicalNoteModal } from '../components';

export default function DoctorNotesScreen() {
  const {
    data,
    isAddNoteModalOpen,
    setIsAddNoteModalOpen,
    handleCreateNote,
  } = useDoctor();

  if (!data) return null;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a3832] dark:text-white tracking-tight">
            Clinical Consultation Notes
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Traceable clinical documentation, observations, and care addenda
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddNoteModalOpen(true)}
          className="px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8075] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
        >
          <span>+</span>
          <span>Add Clinical Note</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.clinicalNotes.map(note => (
          <div
            key={note.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#0c2b24] border border-teal-100/80 dark:border-[#154c40] space-y-3 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 dark:bg-[#0e3a31] dark:text-teal-200">
                {note.category}
              </span>
              <span className="text-xs text-gray-400">{note.date}</span>
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-gray-900 dark:text-white">
                {note.title}
              </h2>
              <p className="text-xs text-teal-700 dark:text-teal-300 font-semibold mt-0.5">
                Patient: {note.patientName} ({note.patientCode})
              </p>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed bg-[#f8fcfa] dark:bg-[#071f1a] p-3 rounded-2xl border border-gray-100 dark:border-[#154c40]">
              &ldquo;{note.content}&rdquo;
            </p>

            {note.recommendations.length > 0 && (
              <div className="space-y-1 pt-1">
                <span className="text-[10.5px] font-bold text-gray-700 dark:text-gray-300">Recommendations:</span>
                <ul className="list-disc pl-4 text-xs text-gray-600 dark:text-gray-300 space-y-0.5">
                  {note.recommendations.map(r => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-2 border-t border-gray-100 dark:border-[#154c40] flex justify-between items-center text-[10px] text-gray-400">
              <span>Author: <strong>{note.author}</strong></span>
              <span>Signed &amp; Immutable</span>
            </div>
          </div>
        ))}
      </div>

      <AddClinicalNoteModal
        isOpen={isAddNoteModalOpen}
        patients={data.patientsList}
        onClose={() => setIsAddNoteModalOpen(false)}
        onSaveNote={handleCreateNote}
      />
    </div>
  );
}

