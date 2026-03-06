import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';

export const selectChatMeta = createSelector(
  [
    (_: RootState, chatId: string) => chatId,
    (state: RootState, chatId: string) => state.messages.loadingByChat[chatId],
    (state: RootState, chatId: string) => state.messages.sendingByChat[chatId],
    (state: RootState, chatId: string) => state.messages.hasMoreByChat[chatId],
    (state: RootState, chatId: string) => state.messages.cursorByChat[chatId],
    (state: RootState, chatId: string) => state.messages.errorByChat[chatId],
  ],
  (chatId, loading, sending, hasMore, cursor, error) => ({
    chatId,
    loading: loading ?? false,
    sending: sending ?? false,
    hasMore: hasMore ?? true,
    cursor: cursor ?? null,
    error: error ?? null,
  })
);
