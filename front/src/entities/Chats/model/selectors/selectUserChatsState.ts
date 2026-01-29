import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';

export const selectUserChatsState = createSelector(
  (state: RootState) => state.chats.isLoading,
  (state: RootState) => state.chats.error,
  (state: RootState) => state.chats.hasMore,
  (state: RootState) => state.chats.nextCursor,
  (isLoading, error, hasMore, nextCursor) => ({
    isLoading,
    error,
    hasMore,
    nextCursor,
  })
);