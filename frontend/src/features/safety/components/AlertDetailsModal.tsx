'use client';

import React from 'react';
import type { RecentSafetyAlertItem } from '../types/safety.types';

interface Props {
  isOpen: boolean;
  alertItem: RecentSafetyAlertItem | null;
  onClose: () => void;
}

export default function AlertDetailsModal({
  isOpen,
  alertItem,
  onClose,
}: Props) {
  if (!isOpen || !alertItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100 dark:border-[#154c40] p-6 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-[#154c40]">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-[#0f352c] text-[#0d9488] dark:text-[#2dd4bf] flex items-center justify-center font-bold text-xs">
              🛡️
            </span>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Alert Record {alertItem.id}
              </h3>
              <p className="text-[11px] text-gray-400">{alertItem.triggeredAt}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#124138] flex items-center justify-center transition cursor-pointer text-xs"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-gray-50/70 dark:bg-[#0f352c] border border-gray-100 dark:border-[#154c40]">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Status</p>
            <p className="font-bold text-rose-600 dark:text-rose-400 mt-0.5">{alertItem.status}</p>
          </div>

          <div className="p-3 rounded-2xl bg-gray-50/70 dark:bg-[#0f352c] border border-gray-100 dark:border-[#154c40]">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">SMS Dispatch</p>
            <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{alertItem.smsStatus}</p>
          </div>

          <div className="p-3 rounded-2xl bg-gray-50/70 dark:bg-[#0f352c] border border-gray-100 dark:border-[#154c40]">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Contacts Reached</p>
            <p className="font-bold text-gray-800 dark:text-white mt-0.5">{alertItem.contactsNotified} Caregivers</p>
          </div>

          <div className="p-3 rounded-2xl bg-gray-50/70 dark:bg-[#0f352c] border border-gray-100 dark:border-[#154c40]">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Broadcast Radius</p>
            <p className="font-bold text-teal-700 dark:text-teal-300 mt-0.5">Active GPS Enabled</p>
          </div>
        </div>

        {alertItem.location && (
          <div className="p-3 rounded-2xl bg-teal-50/50 dark:bg-[#0e352d] border border-teal-100 dark:border-[#14483e] text-xs">
            <span className="font-bold text-[#0d9488] dark:text-[#2dd4bf]">📍 Incident Coordinates:</span>
            <p className="text-gray-600 dark:text-gray-300 mt-0.5 font-medium">{alertItem.location}</p>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#0a3832] dark:bg-[#0d9488] hover:bg-[#082d28] text-white text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

