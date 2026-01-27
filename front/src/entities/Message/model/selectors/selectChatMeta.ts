import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';

export const selectChatMeta = createSelector(
  [
    (state: RootState) => state.messages.loadingByChat,
    (state: RootState) => state.messages.sendingByChat,
    (state: RootState) => state.messages.hasMoreByChat,
    (state: RootState) => state.messages.cursorByChat,
    (state: RootState) => state.messages.errorByChat,
    (_: RootState, chatId?: string | null) => chatId,
  ],
  (loading, sending, hasMore, cursor, chatId) => {
    if (!chatId) {
      return {
        loading: false,
        sending: false,
        hasMore: false,
        cursor: null,
      };
    }

    const id = chatId as unknown as string;
    return {
      loading: loading[id] ?? false,
      sending: sending[id] ?? false,
      hasMore: hasMore[id] ?? true,
      cursor: cursor[id] ?? null,
      error: cursor[id] ?? null,
    };
  }
);
