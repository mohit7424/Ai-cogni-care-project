'use client';

import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectConversation: (title: string) => void;
}

const mockPastConversations = [
  { id: '1', title: 'Exam stress & sleep routines', date: 'Today, 10:24 AM', messages: 4 },
  { id: '2', title: 'Deep breathing exercise reflection', date: 'Yesterday, 4:15 PM', messages: 8 },
  { id: '3', title: 'Managing morning cognitive fatigue', date: '08 Nov 2025, 9:30 AM', messages: 6 },
  { id: '4', title: 'Mindfulness & grounding habits', date: '05 Nov 2025, 6:00 PM', messages: 12 },
];

export default function ConversationHistoryModal({
  isOpen,
  onClose,
  onSelectConversation,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100 dark:border-[#154c40] p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-[#154c40] pb-3">
          <div className="flex items-center gap-2">
            <svg className="w-4.5 h-4.5 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Conversation History
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto">
          {mockPastConversations.map(c => (
            <div
              key={c.id}
              onClick={() => {
                onSelectConversation(c.title);
                onClose();
              }}
              className="p-3.5 rounded-2xl bg-gray-50/80 dark:bg-[#0f352c] hover:bg-teal-50 dark:hover:bg-[#124138] border border-gray-100 dark:border-[#154c40] cursor-pointer transition flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold text-gray-800 dark:text-white leading-tight">
                  {c.title}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">{c.date}</p>
              </div>
              <span className="text-[10px] font-semibold text-[#0d9488] bg-teal-50 dark:bg-[#0e3a31] px-2 py-0.5 rounded-full">
                {c.messages} msgs
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 bg-gray-100 dark:bg-[#124138] text-gray-700 dark:text-gray-200 text-xs font-semibold rounded-xl hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

