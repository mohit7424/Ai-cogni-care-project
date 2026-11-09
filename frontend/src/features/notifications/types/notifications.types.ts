export type NotificationCategory = 'All' | 'Unread' | 'Medication' | 'Clinical' | 'Safety';
export type NotificationUrgency = 'urgent' | 'important' | 'info';

export interface NotificationItem {
  id: string;
  category: 'Medication' | 'Clinical' | 'Safety';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  urgency: NotificationUrgency;
  actionUrl?: string;
  actionLabel?: string;
}

export interface NotificationsPageData {
  pageTitle: string;
  subtitle: string;
  unreadCount: number;
  notifications: NotificationItem[];
}

