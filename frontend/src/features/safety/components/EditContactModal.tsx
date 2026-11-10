'use client';

import React, { useState } from 'react';
import type { TrustedContactItem } from '../types/safety.types';

interface Props {
  isOpen: boolean;
  contact: TrustedContactItem | null;
  onClose: () => void;
  onSave: (updated: TrustedContactItem) => void;
}

export default function EditContactModal({
  isOpen,
  contact,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState(contact?.name ?? '');
  const [email, setEmail] = useState(contact?.email ?? '');
  const [relationship, setRelationship] = useState(contact?.relationship ?? 'Sister');
  const [phone, setPhone] = useState(contact?.phone ?? '');

  if (!isOpen || !contact) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!contact || !name.trim() || !phone.trim()) return;

    const initials = name
      .split(' ')
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    onSave({
      ...contact,
      name: name.trim(),
      email: email.trim(),
      relationship: relationship.trim(),
      phone: phone.trim(),
      initials: initials || contact.initials,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100 dark:border-[#154c40] shadow-2xl max-w-md w-full p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#154c40]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-[#0f352c] text-[#0d9488] dark:text-[#2dd4bf] flex items-center justify-center font-bold text-sm">
              ✏️
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              Edit Trusted Contact
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#124138] flex items-center justify-center transition cursor-pointer text-xs"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] dark:bg-[#0d2e27] dark:text-white focus:border-[#0d9488] focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900/40 outline-none text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] dark:bg-[#0d2e27] dark:text-white focus:border-[#0d9488] focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900/40 outline-none text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                Relationship *
              </label>
              <select
                value={relationship}
                onChange={e => setRelationship(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] dark:bg-[#0d2e27] dark:text-white focus:border-[#0d9488] outline-none text-xs"
              >
                <option value="Sister">Sister</option>
                <option value="Brother">Brother</option>
                <option value="Friend">Friend</option>
                <option value="Parent">Parent</option>
                <option value="Spouse">Spouse</option>
                <option value="Caregiver">Caregiver</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-[#19584b] dark:bg-[#0d2e27] dark:text-white focus:border-[#0d9488] outline-none text-xs font-mono"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-gray-100 dark:border-[#154c40]">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#124138] font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-5 bg-[#0d9488] hover:bg-[#0b8075] text-white font-bold rounded-xl shadow-xs transition cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
