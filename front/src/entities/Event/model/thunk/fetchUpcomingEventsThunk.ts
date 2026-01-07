import { createAsyncThunk } from '@reduxjs/toolkit';
import type { EventsPayload } from '@/shared/types';
import type { ThunkAPI } from '@/shared/config/redux';

export const fetchUpcomingEventsThunk = createAsyncThunk<
  EventsPayload,
  { cursor?: string | null },
  ThunkAPI
>(
  'events/fetchUpcomingEvents',
  async ({ cursor }, { extra, getState, rejectWithValue }) => {
    const { events } = getState();
    const feed = events.upcoming;
    const now = Date.now();

    // Кешування: якщо вже завантажені всі події і немає cursor
    if (!cursor && !feed.hasMore && feed.lastFetchedAt && now - feed.lastFetchedAt < 60_000) {
      return rejectWithValue('cached');
    }

    try {
      return await extra.services.events.getUpcomingEvents(cursor);
    } catch (e) {
      return rejectWithValue(
        extra.extractErrorMessage(e, 'Failed to fetch upcoming events')
      );
    }
  }
);
