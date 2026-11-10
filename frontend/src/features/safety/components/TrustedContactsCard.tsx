'use client';

import React from 'react';
import type { TrustedContactItem } from '../types/safety.types';

interface Props {
  contacts: TrustedContactItem[];
  onCallContact: (contact: TrustedContactItem) => void;
  onOpenAddModal: () => void;
}

export default function TrustedContactsCard({
  contacts,
  onCallContact,
  onOpenAddModal,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center text-sm font-bold">
            👥
          </div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Trusted Contacts
          </h2>
        </div>

        <span className="text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full shadow-2xs">
          {contacts.length} Contacts
        </span>
      </div>

      {/* Contacts List matching screenshot */}
      <div className="space-y-4">
        {contacts.map(c => (
          <div
            key={c.id}
            className="p-4 rounded-2xl border border-teal-100/70 bg-[#f9fdfc] hover:border-teal-300 transition flex items-center justify-between gap-4"
          >
            {/* Left: Avatar + Details */}
            <div className="flex items-center gap-3.5">
              {/* Avatar Photo / Initials */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-600 to-[#0a3832] text-white flex items-center justify-center font-bold text-sm shadow-xs ring-2 ring-teal-200/60 overflow-hidden shrink-0">
                {c.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.avatarUrl} alt={c.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{c.initials}</span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-gray-900">{c.name}</h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      c.isPrimary
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {c.tag ?? c.relationship}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{c.relationship}</p>
                <p className="text-xs font-semibold text-teal-800 mt-0.5">{c.phone}</p>
              </div>
            </div>

            {/* Right: Call & Options Actions matching screenshot */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onCallContact(c)}
                className="w-10 h-10 rounded-2xl bg-[#e6f7f3] hover:bg-[#d4f2ea] text-[#0d9488] flex items-center justify-center transition border border-teal-100 shadow-2xs cursor-pointer active:scale-95"
                title={`Call ${c.name}`}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </button>

              <button
                type="button"
                className="w-8 h-10 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition cursor-pointer"
                title="More options"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="1.75" />
                  <circle cx="12" cy="12" r="1.75" />
                  <circle cx="12" cy="19" r="1.75" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Contact Button matching screenshot */}
      <button
        type="button"
        onClick={onOpenAddModal}
        className="w-full py-3 rounded-2xl border-2 border-dashed border-teal-200 hover:border-[#0d9488] bg-teal-50/40 hover:bg-teal-50 text-[#0d9488] font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <span>+</span>
        <span>Add Contact</span>
      </button>
    </div>
  );
}
