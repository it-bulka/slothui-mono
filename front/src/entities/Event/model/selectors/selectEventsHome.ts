import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';

export const selectEventsHome = createSelector(
  (state: RootState) => state.events.home.ids,
  (state: RootState) => state.events.entities,
  (state: RootState) => state.events.home.isLoading,
  (state: RootState) => state.events.home.error,
  (ids, entities, isLoading, error) => ({
    items: ids.map(id => entities[id]!).filter(Boolean),
    isLoading,
    error,
  })
);