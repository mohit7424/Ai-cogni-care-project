'use client';

import React from 'react';

interface NavbarProps {
  userName?: string;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export default function Navbar({
  userName = 'Alex Parker',
  searchQuery = '',
  onSearchChange,
}: NavbarProps) {
  return (
    <header className="flex items-center justify-between gap-4 py-3.5 px-6 lg:px-8 bg-white border-b border-gray-100/90 shadow-2xs shrink-0">
      {/* Search Input Bar */}
      <div className="relative flex-1 max-w-lg">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange?.(e.target.value)}
          placeholder="Search assessments, medications, scans..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50/80 hover:bg-gray-50 focus:bg-white border border-gray-200/80 focus:border-[#0d9488] rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-teal-100"
        />
      </div>

      {/* Right Actions & Profile */}
      <div className="flex items-center gap-3">
        {/* Notifications Icon Button */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2 text-gray-500 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0d9488] rounded-full ring-2 ring-white" />
        </button>

        {/* Dark/Light mode icon */}
        <button
          type="button"
          aria-label="Toggle Theme"
          className="p-2 text-gray-500 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        {/* User Pill */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0e8a7d] to-[#2dd4bf] text-white flex items-center justify-center font-bold text-xs ring-2 ring-teal-100">
            AP
          </div>
          <span className="text-xs font-semibold text-gray-700 hidden sm:inline">
            {userName}
          </span>
          <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </header>
  );
}
