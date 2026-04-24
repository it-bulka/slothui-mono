import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';

export const selectLikedPostsMeta = createSelector(
  [(state: RootState) => state.posts.likes],
  (likes) => ({
    isLoading: likes.isLoading,
    hasMore: likes.hasMore,
    nextCursor: likes.nextCursor,
  })
);