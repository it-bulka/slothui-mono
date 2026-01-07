import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';

export const selectSubscribedEvents = createSelector(
  (state: RootState) => state.events.subscribed,
  (state: RootState) => state,
  (feed, state) => ({
    items: feed.ids.map(id => state.events.entities[id]).filter(Boolean),
    isLoading: feed.isLoading,
    error: feed.error,
    hasMore: Boolean(feed.hasMore),
    nextCursor: feed.nextCursor,
  })
)