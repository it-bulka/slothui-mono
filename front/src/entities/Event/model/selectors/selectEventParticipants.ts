import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';

export const selectEventParticipants = (eventId?: string) =>
  createSelector(
    (state: RootState) => eventId && state.events.participants[eventId],
    (data) => {
      if (!data) return {
        items: [],
        isLoading:  false,
        error: 'No event with such id or id was found.',
      };

      return {
        items: data?.items ?? [],
        isLoading: data?.isLoading ?? false,
        error: data?.error,
      }
    }
  );