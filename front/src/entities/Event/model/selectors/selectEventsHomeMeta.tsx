import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';

export const selectHomeEventsMeta = createSelector(
  [(state: RootState) => state.events.home],
  (home) => ({
    isLoading: home.isLoading,
    hasMore: home.hasMore,
    nextCursor: home.nextCursor
  })
);