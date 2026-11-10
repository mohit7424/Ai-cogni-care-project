'use client';

import React from 'react';

interface Props {
  botName: string;
  statusText: string;
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  onNewChat: () => void;
  onToggleHistory: () => void;
}

export default function AIAssistantHeader({
  botName,
  statusText,
  selectedLanguage,
  onSelectLanguage,
  onNewChat,
  onToggleHistory,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
      {/* Left: Robot Avatar + Bot Name + Online Status */}
      <div className="flex items-center gap-3">
        {/* Robot Icon Pill */}
        <div className="relative">
          <div className="w-11 h-11 rounded-2xl bg-[#daf5ed] dark:bg-[#0e3a31] border border-teal-200/80 dark:border-[#154c40] flex items-center justify-center text-[#0d9488] dark:text-[#2dd4bf] shadow-2xs">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Antenna */}
              <line x1="12" y1="2" x2="12" y2="5" />
              <circle cx="12" cy="2" r="1" fill="currentColor" />
              {/* Head */}
              <rect x="4" y="5" width="16" height="15" rx="4" />
              {/* Eyes */}
              <circle cx="9" cy="11" r="1.5" fill="currentColor" />
              <circle cx="15" cy="11" r="1.5" fill="currentColor" />
              {/* Smile / Mouth */}
              <path d="M9 16c1.5 1 4.5 1 6 0" />
            </svg>
          </div>
          {/* Green Online Dot */}
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#061815] rounded-full" />
        </div>

        <div>
          <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {botName}
          </h1>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {statusText}
            </span>
          </div>
        </div>
      </div>

      {/* Right Actions: + New Chat, Conversation History, Language Dropdown */}
      <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap self-start sm:self-auto">
        {/* + New Chat Button */}
        <button
          type="button"
          onClick={onNewChat}
          className="px-3.5 sm:px-4 py-2 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer touch-manipulation"
        >
          <span className="text-sm font-extrabold">+</span>
          <span>New Chat</span>
        </button>

        {/* Conversation History Button */}
        <button
          type="button"
          onClick={onToggleHistory}
          className="px-3 sm:px-3.5 py-2 bg-white dark:bg-[#0c2b24] hover:bg-teal-50/50 dark:hover:bg-[#124138] border border-gray-200 dark:border-[#154c40] text-gray-700 dark:text-gray-200 text-xs font-semibold rounded-xl shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="hidden sm:inline">Conversation History</span>
          <span className="sm:hidden">History</span>
        </button>

        {/* Language Dropdown Selector */}
        <div className="relative">
          <select
            value={selectedLanguage}
            onChange={e => onSelectLanguage(e.target.value)}
            className="appearance-none bg-white dark:bg-[#0c2b24] hover:bg-teal-50/50 dark:hover:bg-[#124138] border border-gray-200 dark:border-[#154c40] text-gray-700 dark:text-gray-200 text-xs font-semibold rounded-xl pl-3 pr-7 py-2 shadow-2xs transition cursor-pointer outline-none focus:border-[#0d9488]"
          >
            <option value="English">English</option>
            <option value="Hindi">हिंदी (Hindi)</option>
            <option value="Spanish">Español</option>
            <option value="French">Français</option>
          </select>
          <span className="pointer-events-none absolute right-2.5 top-2.5 text-xs text-gray-400">
            ▾
          </span>
        </div>
      </div>
    </div>
  );
}

