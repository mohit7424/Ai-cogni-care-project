'use client';

import React from 'react';
import type { TrustedContactItem } from '../types/safety.types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  statusMessage: string | null;
  contacts: TrustedContactItem[];
}

export default function EmergencySosModal({
  isOpen,
  onClose,
  statusMessage,
  contacts,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl border-2 border-rose-300 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-center">
        {/* Siren Graphic */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-3xl font-extrabold animate-bounce shadow-lg shadow-rose-200">
            🚨
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            EMERGENCY SOS ACTIVE
          </span>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight pt-2">
            Help Has Been Alerted
          </h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
            {statusMessage || 'Emergency response teams and your primary caregivers are being notified right now with your live GPS location.'}
          </p>
        </div>

        {/* Contacts alerted */}
        <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 text-left space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
            Notifying Trusted Contacts:
          </p>
          <div className="space-y-1.5">
            {contacts.map(c => (
              <div
                key={c.id}
                className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-rose-100"
              >
                <div>
                  <span className="font-bold text-gray-900">{c.name}</span>
                  <span className="text-gray-400 text-[10px] ml-1.5">({c.relationship})</span>
                </div>
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md text-[10px]">
                  Alert Sent
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Call 911 / Local Emergency Button */}
        <div className="space-y-2 pt-1">
          <a
            href="tel:911"
            className="w-full py-3.5 px-6 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-rose-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>📞</span>
            <span>Dial Local Emergency Dispatch (911)</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-xs font-semibold text-gray-500 hover:text-gray-800 rounded-xl transition cursor-pointer"
          >
            Dismiss / Stand Down Alert
          </button>
        </div>
      </div>
    </div>
  );
}

