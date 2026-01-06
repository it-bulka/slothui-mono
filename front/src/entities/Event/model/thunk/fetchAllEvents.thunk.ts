import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkAPI } from '@/shared/config/redux'
import type { EventsPayload } from '@/shared/types';

export const fetchAllEventsThunk = createAsyncThunk<
  EventsPayload,
  { cursor?: string | null },
  ThunkAPI
>(
  'events/fetchAllEvents',
  async ({ cursor }, { extra, getState, rejectWithValue }) => {
    const { events } = getState()
    const feed = events.home
    const now = Date.now()

    // cache
    if (
      !cursor &&
      !feed.hasMore &&
      feed.lastFetchedAt &&
      now - feed.lastFetchedAt < 60_000
    ) {
      return rejectWithValue('cached')
    }

    try {
      return await extra.services.events.listEvents(cursor)
    } catch (e) {
      return rejectWithValue(
        extra.extractErrorMessage(e, 'Failed to fetch events')
      )
    }
  }
)
