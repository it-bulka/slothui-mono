import type { RootState } from '@/app/config';
import { createSelector } from '@reduxjs/toolkit';

export const selectFollowersStateByUser = createSelector(
  [
    (state: RootState) => state.friends.followersByUser,
    (_: RootState, userId?: string) => userId,
  ],
  (followersByUser, userId) => {
    const page = followersByUser[userId || ''];

    if (!page || !userId) {
      return {
        isLoading: false,
        hasMore: true,
        nextCursor: null,
        error: undefined,
      };
    }

    return {
      isLoading: page.isLoading ?? false,
      hasMore: page.hasMore ?? true,
      nextCursor: page.nextCursor ?? null,
      error: page.error,
    };
  }
);