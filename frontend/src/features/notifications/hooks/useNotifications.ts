import { useState } from 'react';
import { mockNotificationsData } from '../data/notifications.data';
import type {
  NotificationCategory,
  NotificationsPageData,
} from '../types/notifications.types';

export function useNotifications() {
  const [data, setData] = useState<NotificationsPageData>(mockNotificationsData);
  const [selectedCategory, setSelectedCategory] = useState<NotificationCategory>('All');

  const filteredNotifications = data.notifications.filter(item => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Unread') return !item.read;
    return item.category === selectedCategory;
  });

  function handleMarkAsRead(id: string) {
    setData(prev => {
      const updated = prev.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      );
      const unread = updated.filter(n => !n.read).length;
      return { ...prev, notifications: updated, unreadCount: unread };
    });
  }

  function handleMarkAllAsRead() {
    setData(prev => ({
      ...prev,
      unreadCount: 0,
      notifications: prev.notifications.map(n => ({ ...n, read: true })),
    }));
  }

  function handleClearAll() {
    setData(prev => ({
      ...prev,
      unreadCount: 0,
      notifications: [],
    }));
  }

  return {
    data,
    selectedCategory,
    setSelectedCategory,
    filteredNotifications,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleClearAll,
  };
}

