'use client';

import React from 'react';
import type { DashboardStats } from '../types/dashboard.types';

interface GreetingBannerProps {
  name?: string;
  greeting?: string;
  stats?: DashboardStats;
}

export default function GreetingBanner({
  name = 'Alex',
  greeting = 'Good morning',
  stats = {
    overallProgress: 72,
    completedActivities: 5,
    totalActivities: 6,
    trend: 'stable',
    accountStatus: 'active',
  },
}: GreetingBannerProps) {
  return (
    <div className="greeting-banner-card w-full rounded-2xl border border-teal-100/80 dark:border-[#14483e] p-4 sm:p-5 shadow-xs transition-all duration-200">
      <div className="flex items-center justify-between mb-3.5 sm:mb-4 gap-2">
        <div className="min-w-0">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight truncate">
            {greeting}, {name}!
          </h2>
          <p className="text-[11px] sm:text-xs text-teal-800/80 dark:text-teal-300 font-medium mt-0.5 line-clamp-1">
            Take a small step today for a healthier mind.
          </p>
        </div>

        {/* Small Patient Photo Badge */}
        <div className="relative shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-teal-200 to-emerald-200 dark:from-teal-800 dark:to-teal-600 border-2 border-white dark:border-[#154c40] shadow-sm flex items-center justify-center overflow-hidden">
            <span className="text-xs sm:text-sm font-bold text-teal-800 dark:text-teal-100">👴🏼</span>
          </div>
        </div>
      </div>

      {/* 4 Quick Stat Pills: 2x2 on mobile, 4x1 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {/* Stat 1: Overall Progress */}
        <div className="bg-white/95 dark:bg-[#071f1a] rounded-xl border border-teal-100 dark:border-[#14483e] p-2 sm:p-2.5 flex items-center gap-2 sm:gap-2.5 shadow-2xs min-w-0">
          <span className="text-xs sm:text-sm font-extrabold text-[#0d9488] dark:text-[#2dd4bf] bg-teal-50 dark:bg-[#0e352d] px-1.5 sm:px-2 py-1 rounded-lg shrink-0">
            {stats.overallProgress}%
          </span>
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-500 dark:text-teal-400/80 tracking-wider truncate">
              Overall
            </p>
            <p className="text-[11px] sm:text-xs font-semibold text-gray-800 dark:text-gray-100 truncate">Progress</p>
          </div>
        </div>

        {/* Stat 2: Activities Completed */}
        <div className="bg-white/95 dark:bg-[#071f1a] rounded-xl border border-teal-100 dark:border-[#14483e] p-2 sm:p-2.5 flex items-center gap-2 sm:gap-2.5 shadow-2xs min-w-0">
          <span className="text-xs sm:text-sm font-extrabold text-[#0d9488] dark:text-[#2dd4bf] bg-teal-50 dark:bg-[#0e352d] px-1.5 sm:px-2 py-1 rounded-lg shrink-0">
            {stats.completedActivities}/{stats.totalActivities}
          </span>
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-500 dark:text-teal-400/80 tracking-wider truncate">
              Activities
            </p>
            <p className="text-[11px] sm:text-xs font-semibold text-gray-800 dark:text-gray-100 truncate">Completed</p>
          </div>
        </div>

        {/* Stat 3: Trend */}
        <div className="bg-white/95 dark:bg-[#071f1a] rounded-xl border border-teal-100 dark:border-[#14483e] p-2 sm:p-2.5 flex items-center gap-2 sm:gap-2.5 shadow-2xs min-w-0">
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-50 dark:bg-[#0e352d] text-[#0d9488] dark:text-[#2dd4bf] flex items-center justify-center font-bold text-xs shrink-0">
            🏆
          </span>
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-500 dark:text-teal-400/80 tracking-wider truncate">
              {stats.trend === 'stable' ? 'Stable' : 'Improving'}
            </p>
            <p className="text-[11px] sm:text-xs font-semibold text-gray-800 dark:text-gray-100 truncate">Trend</p>
          </div>
        </div>

        {/* Stat 4: Account Status */}
        <div className="bg-white/95 dark:bg-[#071f1a] rounded-xl border border-teal-100 dark:border-[#14483e] p-2 sm:p-2.5 flex items-center gap-2 sm:gap-2.5 shadow-2xs min-w-0">
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-50 dark:bg-[#0e352d] text-[#0d9488] dark:text-[#2dd4bf] flex items-center justify-center font-bold text-xs shrink-0">
            ✓
          </span>
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-500 dark:text-teal-400/80 tracking-wider truncate">
              {stats.accountStatus === 'active' ? 'Active' : 'Pending'}
            </p>
            <p className="text-[11px] sm:text-xs font-semibold text-gray-800 dark:text-gray-100 truncate">Account</p>
          </div>
        </div>
      </div>
    </div>
  );
}
