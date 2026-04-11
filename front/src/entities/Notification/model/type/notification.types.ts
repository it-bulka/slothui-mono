import type { UserShort } from '@/shared/types';

export type NotificationType =
  | 'like'
  | 'follow'
  | 'comment'
  | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  createdAt: string;
  read: boolean;

  actor?: UserShort;
  entityId?: string;
  entityTitle?: string;
  meta?: Record<string, unknown>;
}

export interface NotificationState {
  nextCursor: string | null;
  hasMore: boolean;

  isLoading: boolean;
  error?: string;

  unreadCount: number;

  liveIncomingCount: number;
}