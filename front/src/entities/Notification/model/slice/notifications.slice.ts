import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Notification, NotificationState } from '../type/notification.types';
import { notificationsAdapter } from './notifications.adapter';
import { fetchNotificationsThunk, loadMoreNotificationsThunk } from '../thunk/fetchNotifications.thunk';

const initialState = notificationsAdapter.getInitialState<NotificationState>({
  nextCursor: null,
  hasMore: true,

  isLoading: false,
  error: undefined,

  unreadCount: 0,
  liveIncomingCount: 0,
});

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // ========== SOCKET ==========
    incomingNotification(state, action: PayloadAction<Notification>) {
      const n = action.payload;

      if (state.entities[n.id]) return;

      notificationsAdapter.addOne(state, n);

      if (!n.read) {
        state.unreadCount += 1;
      }

      state.liveIncomingCount += 1;
    },

    clearLiveCounter(state) {
      state.liveIncomingCount = 0;
    },

    setNotifications(
      state,
      action: PayloadAction<{
        items: Notification[];
        cursor: string | null;
        hasMore: boolean;
        unreadCount: number;
      }>,
    ) {
      notificationsAdapter.setAll(state, action.payload.items);
      state.nextCursor = action.payload.cursor;
      state.hasMore = action.payload.hasMore;
      state.unreadCount = action.payload.unreadCount;
      state.liveIncomingCount = 0;
    },

    markAllAsRead(state) {
      Object.values(state.entities).forEach((n) => {
        if (n) n.read = true;
      });

      state.unreadCount = 0;
      state.liveIncomingCount = 0;
    },
  },

  extraReducers: (builder) => {
    // fetch (full replace / refresh)
    builder
      .addCase(fetchNotificationsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchNotificationsThunk.fulfilled, (state, action) => {
        notificationsAdapter.setAll(state, action.payload.items);
        state.nextCursor = action.payload.cursor;
        state.hasMore = action.payload.hasMore;
        state.unreadCount = action.payload.unreadCount;
        state.liveIncomingCount = 0;
        state.isLoading = false;
      })
      .addCase(fetchNotificationsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | undefined;
      });

    // load more (pagination append)
    builder
      .addCase(loadMoreNotificationsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadMoreNotificationsThunk.fulfilled, (state, action) => {
        notificationsAdapter.addMany(state, action.payload.items);
        state.nextCursor = action.payload.cursor;
        state.hasMore = action.payload.hasMore;
        state.isLoading = false;
      })
      .addCase(loadMoreNotificationsThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const notificationsActions = notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;
