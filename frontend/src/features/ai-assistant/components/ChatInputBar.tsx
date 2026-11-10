'use client';

import React, { KeyboardEvent } from 'react';

interface Props {
  inputValue: string;
  onInputChange: (val: string) => void;
  onSend: () => void;
  isListening: boolean;
  onToggleVoice: () => void;
  safetyNote: string;
  disclaimer: string;
}

export default function ChatInputBar({
  inputValue,
  onInputChange,
  onSend,
  isListening,
  onToggleVoice,
  safetyNote,
  disclaimer,
}: Props) {
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div className="space-y-3 pt-2">
      {/* Primary Input Container */}
      <div className="flex items-center gap-2 bg-white dark:bg-[#0c2b24] border border-gray-200 dark:border-[#154c40] rounded-2xl p-2 sm:p-2.5 shadow-sm focus-within:border-[#0d9488] focus-within:ring-2 focus-within:ring-teal-100 dark:focus-within:ring-teal-900 transition">
        <input
          type="text"
          value={inputValue}
          onChange={e => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Share what's on your mind..."
          className="flex-1 bg-transparent px-3 py-1.5 text-xs sm:text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400 outline-none"
        />

        {/* Microphone Voice Input Button */}
        <button
          type="button"
          onClick={onToggleVoice}
          title={isListening ? 'Listening... click to stop' : 'Click to speak'}
          className={`p-2.5 rounded-xl transition cursor-pointer flex items-center justify-center shrink-0 ${
            isListening
              ? 'bg-rose-500 text-white animate-pulse'
              : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#124138]'
          }`}
        >
          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
        </button>

        {/* Green Send Button */}
        <button
          type="button"
          onClick={onSend}
          disabled={!inputValue.trim()}
          className="p-2.5 sm:px-3 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl shadow-xs transition flex items-center justify-center shrink-0 cursor-pointer"
        >
          <svg className="w-4 h-4 translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>

      {/* Under Input Note: Wellbeing matters */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[8px] font-bold">
          ✦
        </span>
        <span>{safetyNote}</span>
      </div>

      {/* Bottom Medical Disclaimer Pill matching screenshot */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gray-100/90 dark:bg-[#0b2821] border border-gray-200/80 dark:border-[#14483e] text-[10.5px] text-gray-500 dark:text-gray-400 text-center">
          <span className="w-3.5 h-3.5 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center text-[9px] font-bold shrink-0">
            i
          </span>
          <span>{disclaimer}</span>
        </div>
      </div>
    </div>
  );
}

