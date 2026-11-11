'use client';

import React from 'react';
import Image from 'next/image';
import type { TrustedContactItem } from '../types/safety.types';

interface Props {
  contacts: TrustedContactItem[];
  allCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onAddContact: () => void;
  onEditContact: (contact: TrustedContactItem) => void;
  onDeleteContact: (id: string) => void;
}

export default function TrustedContactsTableCard({
  contacts,
  allCount,
  searchQuery,
  onSearchChange,
  onAddContact,
  onEditContact,
  onDeleteContact,
}: Props) {
  return (
    <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-5 sm:p-7 shadow-xs space-y-5 transition-colors duration-200">
      {/* Header: Title + Subtitle + Search + Add Button */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              Trusted Contacts
            </h3>
            <span className="text-[11px] font-bold text-[#0d9488] dark:text-[#2dd4bf] bg-teal-50 dark:bg-[#0f352c] px-2 py-0.5 rounded-full">
              {allCount}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-300 mt-0.5">
            People you trust. Always connected.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Quick Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search contact..."
              className="w-full sm:w-56 pl-8 pr-3 py-2 rounded-xl border border-gray-200 dark:border-[#19584b] dark:bg-[#0d2e27] dark:text-white placeholder:text-gray-400 text-xs focus:border-[#0d9488] outline-none"
            />
            <span className="absolute left-2.5 top-2.5 text-gray-400 text-xs">🔍</span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Add Trusted Contact Button */}
          <button
            type="button"
            onClick={onAddContact}
            className="px-4 py-2.5 bg-[#0a3832] dark:bg-[#0d9488] hover:bg-[#082d28] dark:hover:bg-[#0f766e] active:scale-[0.99] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer touch-manipulation shrink-0"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
            <span>Add Trusted Contact</span>
          </button>
        </div>
      </div>

      {/* Trusted Contacts Cards — all screen sizes */}
      {contacts.length === 0 ? (
        <div className="py-10 text-center text-gray-400 text-xs">
          No contacts found matching &quot;{searchQuery}&quot;.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map(contact => (
            <div
              key={contact.id}
              className="p-4 rounded-2xl bg-gray-50/60 dark:bg-[#0f352c] border border-gray-100 dark:border-[#154c40] hover:border-teal-300 dark:hover:border-teal-600/50 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              {/* Top: Avatar + Name + Email + action buttons */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  {contact.avatarUrl ? (
                    <Image
                      src={contact.avatarUrl}
                      alt={contact.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-teal-100 dark:ring-teal-800"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-100 to-emerald-200 dark:from-teal-800 dark:to-teal-600 text-teal-800 dark:text-teal-100 flex items-center justify-center font-bold text-xs shrink-0 ring-2 ring-teal-50 dark:ring-teal-900">
                      {contact.initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-bold text-gray-800 dark:text-white text-sm truncate">{contact.name}</p>
                    <p className="text-[11px] text-gray-400 dark:text-gray-400 truncate">{contact.email}</p>
                  </div>
                </div>

                {/* Edit & Delete */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => onEditContact(contact)}
                    className="p-1.5 rounded-xl text-teal-600 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-[#14483e] transition cursor-pointer"
                    title="Edit Contact"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteContact(contact.id)}
                    className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition cursor-pointer"
                    title="Delete Contact"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Relationship + Status */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-[#154c40]/60 text-xs">
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  <strong className="text-gray-800 dark:text-white">{contact.relationship}</strong>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 dark:bg-[#124138] text-emerald-700 dark:text-[#2dd4bf] border border-emerald-200/80 dark:border-[#155c4e]">
                  <span>✓</span>
                  <span>{contact.status}</span>
                </span>
              </div>

              {/* Tap-to-call phone */}
              <a
                href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}
                className="w-full py-2 px-3 rounded-xl bg-white dark:bg-[#0c2b24] border border-teal-100 dark:border-[#154c40] flex items-center justify-between font-mono text-xs text-gray-700 dark:text-gray-200 hover:border-teal-300 hover:bg-teal-50/40 transition"
              >
                <span>📞 {contact.phone}</span>
                <span className="text-[11px] font-bold text-[#0d9488] dark:text-[#2dd4bf]">Tap to Call →</span>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
