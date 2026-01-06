import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';

export const selectEventById = (eventId?: string) =>
  createSelector(
    (state: RootState) => eventId ? state.events.entities[eventId] : undefined,
    (event) => event
  );