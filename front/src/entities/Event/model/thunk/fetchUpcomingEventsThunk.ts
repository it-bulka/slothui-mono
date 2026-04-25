import { createAsyncThunk } from '@reduxjs/toolkit';
import type { EventsPayload } from '@/shared/types';
import type { ThunkAPI } from '@/shared/config/redux';

export const fetchUpcomingEventsThunk = createAsyncThunk<
  EventsPayload,
  { cursor?: string | null },
  ThunkAPI
>(
  'events/fetchUpcomingEvents',
  async ({ cursor }, { extra, rejectWithValue }) => {
    try {
      return await extra.services.events.getUpcomingEvents(cursor);
    } catch (e) {
      return rejectWithValue(
        extra.extractErrorMessage(e, 'Failed to fetch upcoming events')
      );
    }
  },
  {
    condition: ({ cursor }, { getState }) => {
      const feed = getState().events.upcoming;

      if (cursor != null) {
        if (!feed.hasMore) return false;
        return cursor !== feed.lastFetchedCursor;
      }

      if (!feed.hasMore) return false;
      const lastFetched = feed.lastFetchedAt;
      if (!lastFetched) return true;
      return Date.now() - lastFetched > 60_000;
    }
  }
);
