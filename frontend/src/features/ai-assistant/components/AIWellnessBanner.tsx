'use client';

import React from 'react';
import type { QuickPromptCardItem } from '../types/aiAssistant.types';

interface Props {
  title: string;
  subtitle: string;
  quickPrompts: QuickPromptCardItem[];
  onSelectPrompt: (promptItem: QuickPromptCardItem) => void;
}

export default function AIWellnessBanner({
  title,
  subtitle,
  quickPrompts,
  onSelectPrompt,
}: Props) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#e8f7f2] via-[#e2f5ee] to-[#d6f0e6] dark:from-[#0a2f27] dark:via-[#092b23] dark:to-[#07241e] border border-teal-100/90 dark:border-[#154c40] rounded-3xl p-5 sm:p-7 shadow-2xs transition-colors duration-200">
      {/* Top Banner Content: Silhouette Illustration + Welcome Heading */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 sm:gap-6 pb-6 border-b border-teal-200/50 dark:border-[#144b3f]/60">
        {/* Left Side: Profile Silhouette with Heart & Leaves Illustration */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/70 dark:bg-[#0c372e]/80 border border-teal-200/80 dark:border-[#18584b] flex items-center justify-center shrink-0 shadow-xs">
          <svg
            className="w-20 h-20 sm:w-24 sm:h-24 text-teal-600 dark:text-teal-400"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {/* Soft decorative leaves in background */}
            <path
              d="M20 70 C15 50 25 35 35 30 C30 45 35 60 20 70 Z"
              fill="currentColor"
              fillOpacity="0.2"
              stroke="none"
            />
            <path
              d="M80 70 C85 50 75 35 65 30 C70 45 65 60 80 70 Z"
              fill="currentColor"
              fillOpacity="0.2"
              stroke="none"
            />

            {/* Human head profile silhouette (mint filled) */}
            <path
              d="M38 85 C38 75 42 70 45 65 C43 62 40 55 40 45 C40 32 48 24 60 24 C72 24 78 33 78 45 C78 55 74 62 72 65 C75 70 80 75 80 85 Z"
              fill="currentColor"
              fillOpacity="0.35"
              stroke="none"
            />

            {/* Glowing Heart inside head / mind */}
            <path
              d="M58 40 C56 37 51 38 51 42 C51 46 58 52 58 52 C58 52 65 46 65 42 C65 38 60 37 58 40 Z"
              fill="#ffffff"
              stroke="none"
            />
          </svg>
        </div>

        {/* Center / Right: Greeting Text */}
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0a3832] dark:text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      {/* 4 Suggestion Cards Row matching screenshot */}
      <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {quickPrompts.map(card => {
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => onSelectPrompt(card)}
              className="group p-4 bg-white dark:bg-[#0c2b24] hover:bg-teal-50/50 dark:hover:bg-[#124138] border border-teal-100 dark:border-[#154c40] hover:border-[#0d9488] rounded-2xl shadow-xs transition-all duration-150 flex flex-col items-center text-center space-y-2 cursor-pointer text-left w-full active:scale-[0.98]"
            >
              {/* Circular Green Icon */}
              <div className="w-10 h-10 rounded-full bg-[#e8f7f2] dark:bg-[#0e3a31] group-hover:bg-[#d5f3e9] dark:group-hover:bg-[#145346] flex items-center justify-center text-[#0d9488] dark:text-[#2dd4bf] transition">
                {card.icon === 'feelings' && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" />
                    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" />
                  </svg>
                )}

                {card.icon === 'stress' && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    {/* Lotus / calm flower petals */}
                    <path d="M12 4c-2 4-4 8-4 12a4 4 0 0 0 8 0c0-4-2-8-4-12z" />
                    <path d="M12 16c-3-1-6-1-8 2 2 2 5 2 8-2z" />
                    <path d="M12 16c3-1 6-1 8 2-2 2-5 2-8-2z" />
                  </svg>
                )}

                {card.icon === 'sleep' && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    {/* Crescent moon */}
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}

                {card.icon === 'day' && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    {/* Calendar */}
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                )}
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#0d9488] transition">
                  {card.title}
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-300 mt-0.5 leading-snug">
                  {card.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

