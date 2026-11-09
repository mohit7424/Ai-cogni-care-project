'use client';

import React from 'react';
import type { DailySupportOverviewData } from '../../types/dailySupport.types';

interface Props {
  data: DailySupportOverviewData;
  onStartActivity: () => void;
  onViewLibrary: () => void;
}

export default function SupportOverviewView({
  data,
  onStartActivity,
  onViewLibrary,
}: Props) {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Title with Header 3D Brain Avatar Banner matching Screen 1 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Daily Support</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Small steps. Big difference for your brain health.
          </p>
        </div>

        {/* 3D Brain Sphere Art Graphic */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#d4f3ec] to-[#b4ebd8] flex items-center justify-center shadow-inner self-start sm:self-auto">
          <span className="text-3xl">🧠</span>
        </div>
      </div>

      {/* Row 1: Today's Support Card (Left) & Your Daily Goal Card with 70% Progress Ring (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Today's Support Banner Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0d9488] bg-teal-50 px-3 py-1 rounded-full">
              📅 Today&apos;s Support
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Good morning, {data.greetingName}!
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              {data.greetingMessage}
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={onStartActivity}
              className="py-2.5 px-6 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <span>Start Today&apos;s Activity</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>

        {/* Right: Your Daily Goal Card with Radial Circle Ring (70%) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-teal-100/80 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
              Your Daily Goal
            </h3>
          </div>

          <div className="flex items-center gap-6">
            {/* Radial 70% Dial */}
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <div className="w-24 h-24 rounded-full border-6 border-teal-100 border-t-[#0d9488] border-r-[#0d9488] flex items-center justify-center bg-white shadow-xs">
                <span className="text-xl font-extrabold text-[#0a3832]">
                  {data.dailyGoalPercent}%
                </span>
              </div>
            </div>

            {/* Checklist items matching screenshot */}
            <div className="space-y-2 flex-1">
              {data.dailyGoals.map(goal => (
                <div key={goal.id} className="flex items-center gap-2 text-xs font-medium text-gray-700">
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      goal.completed
                        ? 'bg-[#0d9488] text-white'
                        : 'border border-gray-300 text-transparent'
                    }`}
                  >
                    ✓
                  </span>
                  <span className={goal.completed ? 'text-gray-800 font-semibold' : 'text-gray-500'}>
                    {goal.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Support Categories (Memory, Attention, Logic, Language) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Support Categories</h3>
            <p className="text-xs text-gray-400">
              Explore activities to keep your mind sharp and active.
            </p>
          </div>

          <button
            type="button"
            onClick={onViewLibrary}
            className="text-xs font-bold text-[#0d9488] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <span>&rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {data.categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={onViewLibrary}
              className="p-4 rounded-2xl bg-white border border-gray-100 hover:border-teal-200 hover:bg-[#fbfdfc] transition text-center shadow-2xs group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 transition">
                {cat.icon}
              </div>
              <h4 className="text-xs font-bold text-gray-800">{cat.name}</h4>
              <p className="text-[10px] text-gray-400 mt-0.5">{cat.subtext}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Row 3: Recommended for You Card matching screenshot 1 */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
          <span>⭐</span>
          <span>Recommended for You</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-teal-100/80 shadow-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-12 rounded-xl bg-gradient-to-tr from-teal-200 to-emerald-300 flex items-center justify-center text-xl shadow-xs shrink-0">
              🏔️
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">
                {data.recommendedActivity.title}
              </h4>
              <p className="text-[11px] text-gray-500">
                {data.recommendedActivity.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-semibold">
              {data.recommendedActivity.duration}
            </span>
            <button
              type="button"
              onClick={onStartActivity}
              className="py-1.5 px-4 bg-[#0d9488] hover:bg-[#0b8075] text-white text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-1 cursor-pointer"
            >
              <span>Start</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

