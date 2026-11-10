'use client';

import React from 'react';
import type { ManualSosBannerInfo } from '../types/safety.types';

interface Props {
  info: ManualSosBannerInfo;
  onOpenSosModal: () => void;
  onCallForHelp: () => void;
  feedbackMessage?: string | null;
  onDismissFeedback?: () => void;
}

export default function ManualSosBannerCard({
  info,
  onOpenSosModal,
  onCallForHelp,
  feedbackMessage,
  onDismissFeedback,
}: Props) {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/80 dark:border-[#154c40] p-5 sm:p-7 shadow-xs transition-colors duration-200">
      {/* Decorative Mint Shield with Heart Background Graphic on Far Right (Matching screenshot) */}
      <div className="absolute right-0 top-0 bottom-0 w-48 sm:w-64 pointer-events-none opacity-20 dark:opacity-10 hidden md:flex items-center justify-end pr-4 sm:pr-6">
        <svg
          viewBox="0 0 200 200"
          className="w-44 sm:w-52 h-44 sm:h-52 text-teal-600 dark:text-teal-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M100 20 C140 20 170 35 170 80 C170 130 100 175 100 175 C100 175 30 130 30 80 C30 35 60 20 100 20 Z"
            fill="currentColor"
            fillOpacity="0.08"
          />
          <path
            d="M100 55 C90 40 68 45 68 65 C68 85 100 110 100 110 C100 110 132 85 132 65 C132 45 110 40 100 55 Z"
            fill="currentColor"
            fillOpacity="0.18"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
        {/* Left Side: Icon + Heading + Subtitle + Green Status Indicator */}
        <div className="flex items-start gap-3.5 sm:gap-4 max-w-xl">
          {/* Rose/Pink Rounded Shield Icon */}
          <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-900/60 flex items-center justify-center shrink-0 shadow-2xs">
            <svg
              className="w-5 sm:w-6 h-5 sm:h-6 text-rose-500 dark:text-rose-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
          </div>

          <div className="space-y-1">
            <h2 className="text-lg sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {info.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 leading-relaxed">
              {info.subtitle}
            </p>

            {/* Ready to use Indicator */}
            <div className="pt-1.5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                {info.statusLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Red SOS Button + Call for Help Link + SMS notice */}
        <div className="flex flex-col items-stretch sm:items-start lg:items-end gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={onOpenSosModal}
            className="w-full sm:w-auto min-h-[46px] px-6 py-3 bg-[#f43f5e] hover:bg-[#e11d48] active:scale-[0.98] text-white font-bold text-sm sm:text-base rounded-2xl shadow-md shadow-rose-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
          >
            <svg className="w-4.5 h-4.5 fill-white animate-bounce" viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
            <span>{info.buttonLabel}</span>
          </button>

          <div className="flex items-center justify-center sm:justify-start lg:justify-end gap-3 text-xs w-full">
            <button
              type="button"
              onClick={onCallForHelp}
              className="font-bold text-[#0d9488] dark:text-[#2dd4bf] hover:underline flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-teal-50 dark:hover:bg-[#124138] transition cursor-pointer"
            >
              <span>📞</span>
              <span>{info.callHelpLabel}</span>
            </button>
          </div>

          <p className="text-[11px] text-gray-400 dark:text-gray-400 text-center sm:text-left lg:text-right max-w-xs">
            {info.smsNotice}
          </p>
        </div>
      </div>

      {/* Instant Feedback Alert if SOS was dispatched */}
      {feedbackMessage && (
        <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 dark:bg-[#124138] border border-emerald-200 dark:border-[#155c4e] text-emerald-800 dark:text-[#2dd4bf] text-xs font-semibold flex items-center justify-between gap-2 animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
            <span>{feedbackMessage}</span>
          </div>
          {onDismissFeedback && (
            <button
              type="button"
              onClick={onDismissFeedback}
              className="text-emerald-700 dark:text-teal-200 hover:text-emerald-900 text-sm font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      )}
    </div>
  );
}
