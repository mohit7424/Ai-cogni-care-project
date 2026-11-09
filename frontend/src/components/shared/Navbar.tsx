'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  return (
    <header className="flex items-center justify-between gap-4 py-3.5 px-6 lg:px-8 bg-white dark:bg-[#09221d] border-b border-gray-100/90 dark:border-[#103a32] shadow-2xs shrink-0 transition-colors duration-200 relative z-30">
      {/* Search Input Bar */}
      <div className="relative flex-1 max-w-lg">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
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
          className="w-full pl-10 pr-4 py-2 bg-gray-50/80 dark:bg-[#0d2e27] hover:bg-gray-50 focus:bg-white dark:focus:bg-[#0e352d] border border-gray-200/80 dark:border-[#14483e] focus:border-[#0d9488] rounded-xl text-xs sm:text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900"
        />
      </div>

      {/* Right Actions & Profile */}
      <div className="flex items-center gap-2.5">
        {/* Dark/Light mode toggle button */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          suppressHydrationWarning
          title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          className="p-2.5 text-gray-500 dark:text-teal-200 hover:text-teal-700 dark:hover:text-white hover:bg-teal-50 dark:hover:bg-[#124138] rounded-xl transition cursor-pointer flex items-center justify-center"
        >
          {isDark ? (
            // Sun Icon for Dark Mode
            <svg className="w-4.5 h-4.5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" fill="currentColor" opacity="0.3" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            // Moon Icon for Light Mode / SSR default
            <svg className="w-4.5 h-4.5 text-gray-600 hover:text-teal-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Notifications Icon Button */}
        <div className="relative">
          <Link
            href="/dashboard/notifications"
            className={`relative p-2.5 rounded-xl transition cursor-pointer flex items-center justify-center ${
              pathname === '/dashboard/notifications'
                ? 'bg-teal-50 dark:bg-[#124138] text-[#0d9488]'
                : 'text-gray-500 dark:text-teal-200 hover:text-teal-700 dark:hover:text-white hover:bg-teal-50 dark:hover:bg-[#124138]'
            }`}
            title="Notifications"
          >
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#0d9488] rounded-full ring-2 ring-white dark:ring-[#09221d]" />
          </Link>
        </div>

        {/* User Profile Pill & Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2.5 pl-2.5 pr-2 py-1 rounded-xl hover:bg-teal-50/60 dark:hover:bg-[#124138] border-l border-gray-200 dark:border-[#14483e] transition cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0e8a7d] to-[#2dd4bf] text-white flex items-center justify-center font-bold text-xs ring-2 ring-teal-100 dark:ring-teal-700">
              AP
            </div>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 hidden sm:inline">
              {userName}
            </span>
            <svg
              className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-[#0c2b24] border border-teal-100 dark:border-[#154a3f] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-[#154a3f]">
                <p className="text-xs font-bold text-gray-900 dark:text-white">{userName}</p>
                <p className="text-[10px] text-gray-400 dark:text-teal-300">Patient ID: CC-00258</p>
              </div>

              <div className="py-1">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-[#124138] hover:text-[#0d9488]"
                >
                  <span>👤</span>
                  <span>View Full Profile</span>
                </Link>

                <Link
                  href="/dashboard/notifications"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-[#124138] hover:text-[#0d9488]"
                >
                  <span>🔔</span>
                  <span>Notification Center</span>
                </Link>

                <Link
                  href="/dashboard/settings"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-[#124138] hover:text-[#0d9488]"
                >
                  <span>⚙️</span>
                  <span>Settings & Privacy</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-gray-100 dark:border-[#154a3f]">
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    toggleTheme();
                  }}
                  className="w-full flex items-center justify-between px-4 py-2 text-xs text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-[#124138] cursor-pointer"
                >
                  <span className="flex items-center gap-2" suppressHydrationWarning>
                    <span>{isDark ? '☀️' : '🌙'}</span>
                    <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#0d9488]" suppressHydrationWarning>
                    {isDark ? 'dark' : 'light'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
