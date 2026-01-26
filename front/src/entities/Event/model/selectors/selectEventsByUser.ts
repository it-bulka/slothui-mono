import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';

export const selectEventsByUser = (userId?: string) =>
  createSelector(
    (state: RootState) => userId && state.events.eventsByUser[userId],
    (state: RootState) => state.events.entities,
    (userFeed, entities) => {
      if (!userFeed) {
        return { items: [], isLoading: false, error: undefined, hasMore: true };
      }

      return {
        items: userFeed.ids.map(id => entities[id]!).filter(Boolean),
        isLoading: userFeed.isLoading,
        error: userFeed.error,
        hasMore: Boolean(userFeed.hasMore),
        nextCursor: userFeed.nextCursor,
      };
    }
  );