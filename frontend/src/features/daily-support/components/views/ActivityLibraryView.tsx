'use client';

import React from 'react';
import type {
  ActivityCardItem,
  ActivityCategory,
} from '../../types/dailySupport.types';

interface Props {
  activities: ActivityCardItem[];
  selectedCategory: ActivityCategory;
  onSelectCategory: (cat: ActivityCategory) => void;
  onLaunchActivity: (id: string) => void;
  onBackToOverview: () => void;
}

const categories: ActivityCategory[] = [
  'All',
  'Memory',
  'Attention',
  'Language',
  'Reasoning',
  'Focus',
];

export default function ActivityLibraryView({
  activities,
  selectedCategory,
  onSelectCategory,
  onLaunchActivity,
  onBackToOverview,
}: Props) {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header with Back Link & 3D Brain Avatar matching Screen 2 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <button
            type="button"
            onClick={onBackToOverview}
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 mb-2 cursor-pointer"
          >
            <span>&larr;</span>
            <span>Daily Support</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Cognitive Activity Library
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Choose an activity to train your brain.
          </p>
        </div>

        {/* Top Right Mint Brain Illustration */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#d4f3ec] to-[#b4ebd8] flex items-center justify-center shadow-inner self-start sm:self-auto">
          <span className="text-3xl">🧠</span>
        </div>
      </div>

      {/* Filter Tabs matching screenshot 2: All, Memory, Attention, Language, Reasoning, Focus */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map(cat => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#0d9488] text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 2x3 Grid of Activity Cards matching screenshot 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map(act => (
          <div
            key={act.id}
            className="p-5 rounded-3xl bg-white border border-teal-100/80 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition"
          >
            <div>
              {/* Graphic Icon Area */}
              <div className="w-full h-24 rounded-2xl bg-gradient-to-tr from-[#f0f9f7] to-[#e4f6f2] flex items-center justify-center text-4xl mb-3 shadow-inner">
                {act.icon}
              </div>

              <h3 className="text-sm font-bold text-gray-900">{act.title}</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">{act.subtitle}</p>

              {/* Badges Row: Duration & Difficulty */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[10px] text-gray-500 font-semibold bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <span>⏱</span>
                  <span>{act.duration}</span>
                </span>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    act.difficulty === 'Easy'
                      ? 'bg-emerald-50 text-emerald-700'
                      : act.difficulty === 'Medium'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {act.difficulty}
                </span>
              </div>
            </div>

            {/* Launch Button */}
            <button
              type="button"
              onClick={() => onLaunchActivity(act.id)}
              className="w-full py-2 px-4 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-2xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Start Activity</span>
              <span>&rarr;</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

