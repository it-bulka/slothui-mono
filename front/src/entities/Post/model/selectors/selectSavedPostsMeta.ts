import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';

export const selectSavedPostsMeta = createSelector(
  (state: RootState) => state.posts.saves,
  (saves) => ({
    hasMore: saves.hasMore,
    isLoading: saves.isLoading,
    nextCursor: saves.nextCursor
  })
);