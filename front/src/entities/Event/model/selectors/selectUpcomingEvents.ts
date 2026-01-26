import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';

export const selectUpcomingEvents = createSelector(
  (state: RootState) => state.events.upcoming,
  (state: RootState) => state,
  (feed, state) => {
    if (!feed) {
      return {
        items: [],
        isLoading: false,
        hasMore: true,
      };
    }

      return {
        items: feed.ids.map(id => state.events.entities[id]).filter(Boolean),
        isLoading: feed.isLoading,
        error: feed.error,
        hasMore: Boolean(feed.hasMore),
        nextCursor: feed.nextCursor,
      }
  }
)