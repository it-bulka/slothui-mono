import { createAsyncThunk } from '@reduxjs/toolkit';
import type { EventsPayload } from '@/shared/types';
import type { ThunkAPI } from '@/shared/config/redux';

export const fetchSubscribedEventsThunk = createAsyncThunk<
  EventsPayload,
  { cursor?: string | null },
  ThunkAPI
>(
  'events/fetchSubscribedEvents',
  async ({ cursor }, { extra, getState, rejectWithValue }) => {
    const { events } = getState()
    const feed = events.subscribed
    const now = Date.now()

    if (
      !cursor &&
      !feed.hasMore &&
      feed.lastFetchedAt &&
      now - feed.lastFetchedAt < 60_000
    ) {
      return rejectWithValue('cached')
    }

    try {
      return await extra.services.events.getSubscribedEvents(cursor)
    } catch (e) {
      return rejectWithValue(
        extra.extractErrorMessage(e, 'Failed to fetch subscribed events')
      )
    }
  }
)
