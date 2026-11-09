'use client';

import React from 'react';
import type { V2MemoryRecallItem } from '../../types';
import { mockV2ScreeningData } from '../../data/screening.data';

interface Props {
  items?: V2MemoryRecallItem[];
  instruction?: string;
  studyTimeSeconds?: number;
  selectedItemIds?: string[];
  onToggleItem?: (id: string) => void;
  onContinue: () => void;
  onBackToOverview: () => void;
}

export default function V2MemoryRecall({
  items = mockV2ScreeningData.memoryRecall.items,
  instruction = mockV2ScreeningData.memoryRecall.instruction,
  studyTimeSeconds = mockV2ScreeningData.memoryRecall.studyTimeSeconds,
  selectedItemIds,
  onToggleItem,
  onContinue,
  onBackToOverview,
}: Props) {
  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2">
        <button
          type="button"
          onClick={onBackToOverview}
          className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
        >
          <span>&larr;</span>
          <span>Back to Overview</span>
        </button>

        {/* 4-Step Line Stepper */}
        <div className="flex items-center gap-6 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-[#0d9488]">
            <span className="w-5 h-5 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-[10px] font-bold">
              1
            </span>
            <span>Questions</span>
          </div>
          <span className="h-0.5 w-10 bg-[#0d9488]" />
          <div className="flex items-center gap-1.5 text-[#0d9488]">
            <span className="w-5 h-5 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-[10px] font-bold">
              2
            </span>
            <span>Memory Recall</span>
          </div>
          <span className="h-0.5 w-10 bg-gray-200" />
          <div className="flex items-center gap-1.5 text-gray-400">
            <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">
              3
            </span>
            <span>Review</span>
          </div>
          <span className="h-0.5 w-10 bg-gray-200" />
          <div className="flex items-center gap-1.5 text-gray-400">
            <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">
              4
            </span>
            <span>Submit</span>
          </div>
        </div>

        <div className="w-20" />
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-teal-100/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center gap-8">
        {/* Left Scanner Hologram Brain matching screenshot 2 */}
        <div className="w-full md:w-72 h-80 rounded-3xl bg-gradient-to-tr from-[#d4f3ec] via-[#b9ecdf] to-[#99e2d1] flex items-center justify-center relative overflow-hidden shrink-0 shadow-inner">
          {/* Scanner Crop Marks */}
          <div className="absolute inset-6 border-2 border-dashed border-teal-500/50 rounded-2xl flex items-center justify-center">
            <span className="text-6xl animate-pulse">🧠</span>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 space-y-6 w-full">
          <div>
            <div className="flex items-center gap-2 text-[#0d9488] mb-1">
              <span className="text-base">🧠</span>
              <span className="text-xs font-bold tracking-wider uppercase">Memory Recall</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              {instruction}
            </h2>
          </div>

          {/* 6 Visual Object Cards (Apple, Car, Chair, Tree, Football, Book) matching screenshot 2 */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 py-3">
            {items.map(item => {
              const isSelected = selectedItemIds?.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => onToggleItem && onToggleItem(item.id)}
                  className={`h-24 rounded-2xl border flex flex-col items-center justify-center p-2 shadow-2xs hover:scale-105 transition cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50/80 border-[#0d9488] ring-2 ring-teal-200'
                      : 'bg-[#f8fcfa] border-teal-100/80'
                  }`}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-[11px] font-bold text-gray-700 mt-1.5">{item.label}</span>
                </div>
              );
            })}
          </div>

          {/* Timer Notice Bar */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f0faf7] border border-teal-100">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="w-4 h-4 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                i
              </span>
              <span>
                You have <strong>{studyTimeSeconds} seconds</strong> to study these items.
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 bg-white border border-teal-200 px-3 py-1 rounded-full shadow-2xs">
              <span>⏱</span>
              <span>00:{studyTimeSeconds.toString().padStart(2, '0')}</span>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onContinue}
              className="py-2.5 px-7 bg-[#0d9488] hover:bg-[#0b8075] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
            >
              Continue &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
