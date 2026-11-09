'use client';

import React from 'react';
import type { NotificationCategory } from '../types/notifications.types';

interface Props {
  selectedCategory: NotificationCategory;
  unreadCount: number;
  onSelectCategory: (cat: NotificationCategory) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

const categories: NotificationCategory[] = ['All', 'Unread', 'Medication', 'Clinical', 'Safety'];

export default function NotificationFilterTabs({
  selectedCategory,
  unreadCount,
  onSelectCategory,
  onMarkAllAsRead,
  onClearAll,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200/80 dark:border-[#14483e]">
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map(cat => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#0d9488] text-white shadow-xs'
                  : 'bg-white dark:bg-[#0c2b24] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#124138] border border-gray-200 dark:border-[#14483e]'
              }`}
            >
              <span>{cat}</span>
              {cat === 'Unread' && unreadCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onMarkAllAsRead}
          className="text-xs font-semibold text-[#0d9488] hover:underline cursor-pointer"
        >
          Mark all as read
        </button>
        <span className="text-gray-300 dark:text-gray-600">•</span>
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs font-semibold text-gray-400 hover:text-rose-500 cursor-pointer"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

