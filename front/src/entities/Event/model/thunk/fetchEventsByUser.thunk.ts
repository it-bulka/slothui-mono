import { createAsyncThunk } from '@reduxjs/toolkit';
import type { EventsPayload } from '@/shared/types';
import type { ThunkAPI } from '@/shared/config/redux';

export const fetchEventsByUserThunk = createAsyncThunk<
  EventsPayload,
  { userId: string; cursor?: string | null },
  ThunkAPI
>(
  'events/fetchEventsByUser',
  async ({ userId, cursor }, { extra, getState, rejectWithValue }) => {
    const { events } = getState()
    const feed = events.eventsByUser[userId]
    const now = Date.now()

    if (
      feed &&
      feed.lastFetchedAt &&
      now - feed.lastFetchedAt < 60_000
    ) {
      return rejectWithValue('cached')
    }

    try {
      return await extra.services.events.getEventsByUser(
        userId,
        cursor
      )
    } catch (e) {
      return rejectWithValue(
        extra.extractErrorMessage(e, 'Failed to fetch user events')
      )
    }
  }
)
