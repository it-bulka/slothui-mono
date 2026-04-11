import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { Notification } from '../type/notification.types';

interface FetchNotificationsResult {
  items: Notification[];
  cursor: string | null;
  hasMore: boolean;
  unreadCount: number;
}

interface LoadMoreNotificationsResult {
  items: Notification[];
  cursor: string | null;
  hasMore: boolean;
}

export const fetchNotificationsThunk = createAsyncThunk<
  FetchNotificationsResult,
  void,
  ThunkAPI
>(
  'notifications/fetchNotifications',
  async (_arg, { extra, rejectWithValue }) => {
    try {
      const [listRes, countRes] = await Promise.all([
        extra.services.notifications.getList(),
        extra.services.notifications.getUnreadCount(),
      ]);
      return {
        items: listRes.items,
        cursor: listRes.nextCursor ?? null,
        hasMore: listRes.hasMore,
        unreadCount: countRes.count,
      };
    } catch (e) {
      return rejectWithValue(
        extra.extractErrorMessage(e, 'Failed to fetch notifications.'),
      );
    }
  },
);

export const loadMoreNotificationsThunk = createAsyncThunk<
  LoadMoreNotificationsResult,
  { cursor: string },
  ThunkAPI
>(
  'notifications/loadMore',
  async ({ cursor }, { extra, rejectWithValue }) => {
    try {
      const res = await extra.services.notifications.getList({ cursor });
      return {
        items: res.items,
        cursor: res.nextCursor ?? null,
        hasMore: res.hasMore,
      };
    } catch (e) {
      return rejectWithValue(
        extra.extractErrorMessage(e, 'Failed to load more notifications.'),
      );
    }
  },
);
