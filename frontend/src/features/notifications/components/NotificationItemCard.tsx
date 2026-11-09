'use client';

import React from 'react';
import Link from 'next/link';
import type { NotificationItem } from '../types/notifications.types';

interface Props {
  item: NotificationItem;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationItemCard({ item, onMarkAsRead }: Props) {
  function getCategoryIcon(cat: NotificationItem['category']) {
    switch (cat) {
      case 'Medication':
        return '💊';
      case 'Clinical':
        return '🧠';
      case 'Safety':
        return '🛡️';
    }
  }

  return (
    <div
      className={`p-5 rounded-3xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        item.read
          ? 'bg-white dark:bg-[#0c2b24] border-gray-100 dark:border-[#14483e] opacity-80'
          : 'bg-[#f4fbf9] dark:bg-[#0f352c] border-teal-200/90 dark:border-[#1d5d51] shadow-xs'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Category Icon Badge */}
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-inner ${
            item.read
              ? 'bg-gray-100 dark:bg-[#124138]'
              : 'bg-[#e6f7f3] dark:bg-[#154d41]'
          }`}
        >
          {getCategoryIcon(item.category)}
        </div>

        {/* Content */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              {item.title}
            </h4>
            {!item.read && (
              <span className="w-2 h-2 rounded-full bg-[#0d9488]" />
            )}
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                item.urgency === 'urgent'
                  ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                  : item.urgency === 'important'
                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                  : 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300'
              }`}
            >
              {item.category}
            </span>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
            {item.message}
          </p>

          <p className="text-[10.5px] text-gray-400 dark:text-gray-500 font-medium pt-0.5">
            ⏱ {item.timestamp}
          </p>
        </div>
      </div>

      {/* Action CTA & Mark as Read */}
      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        {!item.read && (
          <button
            type="button"
            onClick={() => onMarkAsRead(item.id)}
            className="text-xs font-semibold text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-2 py-1 rounded-lg cursor-pointer"
          >
            Mark read
          </button>
        )}

        {item.actionUrl && (
          <Link
            href={item.actionUrl}
            className="py-2 px-4 rounded-xl bg-[#0d9488] hover:bg-[#0b8075] text-white text-xs font-bold shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>{item.actionLabel || 'View'}</span>
            <span>&rarr;</span>
          </Link>
        )}
      </div>
    </div>
  );
}

