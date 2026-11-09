'use client';

import React, { useState } from 'react';
import type { TrustedContactItem, ContactTag } from '../types/safety.types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (contact: Omit<TrustedContactItem, 'id'>) => void;
}

export default function AddContactModal({ isOpen, onClose, onAdd }: Props) {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const [tag, setTag] = useState<ContactTag>('Caregiver');
  const [isPrimary, setIsPrimary] = useState(false);

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const initials = name
      .split(' ')
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    onAdd({
      name: name.trim(),
      relationship: relationship.trim() || 'Caregiver',
      phone: phone.trim(),
      tag,
      isPrimary,
      initials: initials || 'TC',
    });

    setName('');
    setRelationship('');
    setPhone('');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-teal-100 shadow-xl max-w-md w-full p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">👥</span>
            <h3 className="text-lg font-bold text-gray-900">Add Trusted Contact</h3>
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
            <label className="block font-bold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Dr. Emily Watson"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#0d9488] focus:ring-2 focus:ring-teal-100 outline-none text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Relationship / Role
            </label>
            <input
              type="text"
              required
              value={relationship}
              onChange={e => setRelationship(e.target.value)}
              placeholder="e.g. Neurologist • Specialty Caregiver"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#0d9488] focus:ring-2 focus:ring-teal-100 outline-none text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="e.g. +1 (555) 890-1234"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#0d9488] focus:ring-2 focus:ring-teal-100 outline-none text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 items-center">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Role Tag</label>
              <select
                value={tag}
                onChange={e => setTag(e.target.value as ContactTag)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#0d9488] focus:ring-2 focus:ring-teal-100 outline-none text-xs bg-white"
              >
                <option value="Primary">Primary</option>
                <option value="Caregiver">Caregiver</option>
                <option value="Doctor">Doctor</option>
                <option value="Family">Family</option>
              </select>
            </div>

            <div className="pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPrimary}
                  onChange={e => setIsPrimary(e.target.checked)}
                  className="rounded text-[#0d9488] focus:ring-teal-500"
                />
                <span className="font-semibold text-gray-700">Set as Primary</span>
              </label>
            </div>
          </div>

          {/* Buttons */}
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
              Save Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

