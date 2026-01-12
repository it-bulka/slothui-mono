import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  NotificationsCountersState
} from '../types/notificationsCounters.types.ts';
import { fetchNotificationsCountersThunk } from '../thunks';

const initialState: NotificationsCountersState = {
  unreadMessagesTotal: 0,
  unreadMessagesByChat: {},
  newFollowers: 0,
  isLoading: false,
};

export const notificationsCountersSlice = createSlice({
  name: 'notificationsCounters',
  initialState,
  reducers: {
    incrementUnreadMessage: (state, action: { payload: { chatId: string } }) => {
      const { chatId } = action.payload;

      state.unreadMessagesByChat[chatId] =
        (state.unreadMessagesByChat[chatId] ?? 0) + 1;

      state.unreadMessagesTotal += 1;
    },
    unreadBatchReceived: (
      state,
      action: PayloadAction<{
        chats: Record<string, number>;
        totalDelta: number;
      }>
    ) => {
      for (const [chatId, delta] of Object.entries(action.payload.chats)) {
        state.unreadMessagesByChat[chatId] =
          (state.unreadMessagesByChat[chatId] ?? 0) + delta;
      }

      state.unreadMessagesTotal += action.payload.totalDelta;
    },

    resetChatUnread: (state, action: { payload: { chatId: string } }) => {
      const { chatId } = action.payload;

      const unread = state.unreadMessagesByChat[chatId] ?? 0;
      state.unreadMessagesTotal -= unread;
      delete state.unreadMessagesByChat[chatId];
    },

    resetFollowersCounter: (state) => {
      state.newFollowers = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsCountersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNotificationsCountersThunk.fulfilled, (state, action) => {
        state.unreadMessagesTotal = action.payload.unreadMessagesTotal;
        state.unreadMessagesByChat = action.payload.unreadMessagesByChat;
        state.newFollowers = action.payload.newFollowers;
        state.isLoading = false;
      })
      .addCase(fetchNotificationsCountersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const notificationsCountersActions =
  notificationsCountersSlice.actions;
export const notificationsCountersReducer =
  notificationsCountersSlice.reducer;
