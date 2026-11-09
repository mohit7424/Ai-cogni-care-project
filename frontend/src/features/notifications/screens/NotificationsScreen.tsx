'use client';

import React from 'react';
import { useNotifications } from '../hooks/useNotifications';
import NotificationFilterTabs from '../components/NotificationFilterTabs';
import NotificationItemCard from '../components/NotificationItemCard';

export default function NotificationsScreen() {
  const {
    data,
    selectedCategory,
    setSelectedCategory,
    filteredNotifications,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleClearAll,
  } = useNotifications();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a3832] dark:text-teal-200 tracking-tight">
            {data.pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {data.subtitle}
          </p>
        </div>

        {data.unreadCount > 0 && (
          <span className="text-xs font-bold text-[#0d9488] bg-[#e6f7f3] dark:bg-[#124138] border border-teal-100 dark:border-teal-800 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
            {data.unreadCount} Unread Notifications
          </span>
        )}
      </div>

      {/* Filter Tabs & Quick Actions */}
      <NotificationFilterTabs
        selectedCategory={selectedCategory}
        unreadCount={data.unreadCount}
        onSelectCategory={setSelectedCategory}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAll={handleClearAll}
      />

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(item => (
            <NotificationItemCard
              key={item.id}
              item={item}
              onMarkAsRead={handleMarkAsRead}
            />
          ))
        ) : (
          <div className="py-16 text-center bg-white dark:bg-[#0c2b24] rounded-3xl border border-teal-100/70 dark:border-[#14483e] p-8 space-y-2">
            <span className="text-4xl block mb-2">🎉</span>
            <h3 className="text-sm font-bold text-gray-800 dark:text-white">
              All caught up!
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-400 max-w-sm mx-auto">
              You don&apos;t have any pending alerts in this category right now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

