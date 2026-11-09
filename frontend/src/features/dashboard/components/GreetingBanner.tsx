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
    <div className="w-full bg-gradient-to-r from-[#e7f7f4] via-[#edf9f7] to-[#e4f6f3] rounded-2xl border border-teal-100/80 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {greeting}, {name}!
          </h2>
          <p className="text-xs text-teal-800/70 font-medium mt-0.5">
            Take a small step today for a healthier mind.
          </p>
        </div>

        {/* Small Patient Photo Badge */}
        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-200 to-emerald-200 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
            <span className="text-sm font-bold text-teal-800">👴🏼</span>
          </div>
        </div>
      </div>

      {/* 4 Quick Stat Pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Stat 1: Overall Progress */}
        <div className="bg-white/95 rounded-xl border border-teal-100 p-2.5 flex items-center gap-2.5 shadow-2xs">
          <span className="text-sm font-extrabold text-[#0d9488] bg-teal-50 px-2 py-1 rounded-lg">
            {stats.overallProgress}%
          </span>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Overall
            </p>
            <p className="text-xs font-semibold text-gray-700">Progress</p>
          </div>
        </div>

        {/* Stat 2: Activities Completed */}
        <div className="bg-white/95 rounded-xl border border-teal-100 p-2.5 flex items-center gap-2.5 shadow-2xs">
          <span className="text-sm font-extrabold text-[#0d9488] bg-teal-50 px-2 py-1 rounded-lg">
            {stats.completedActivities}/{stats.totalActivities}
          </span>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Activities
            </p>
            <p className="text-xs font-semibold text-gray-700">Completed</p>
          </div>
        </div>

        {/* Stat 3: Trend */}
        <div className="bg-white/95 rounded-xl border border-teal-100 p-2.5 flex items-center gap-2.5 shadow-2xs">
          <span className="w-8 h-8 rounded-lg bg-teal-50 text-[#0d9488] flex items-center justify-center font-bold text-xs shrink-0">
            🏆
          </span>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              {stats.trend === 'stable' ? 'Stable' : 'Improving'}
            </p>
            <p className="text-xs font-semibold text-gray-700">Trend</p>
          </div>
        </div>

        {/* Stat 4: Account Status */}
        <div className="bg-white/95 rounded-xl border border-teal-100 p-2.5 flex items-center gap-2.5 shadow-2xs">
          <span className="w-8 h-8 rounded-lg bg-teal-50 text-[#0d9488] flex items-center justify-center font-bold text-xs shrink-0">
            ✓
          </span>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              {stats.accountStatus === 'active' ? 'Active' : 'Pending'}
            </p>
            <p className="text-xs font-semibold text-gray-700">Account</p>
          </div>
        </div>
      </div>
    </div>
  );
}
