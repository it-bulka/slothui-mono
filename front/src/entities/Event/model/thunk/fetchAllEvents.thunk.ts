import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkAPI } from '@/shared/config/redux'
import type { EventsPayload } from '@/shared/types';

export const fetchAllEventsThunk = createAsyncThunk<
  EventsPayload,
  { cursor?: string | null } | void,
  ThunkAPI
>(
  'events/fetchAllEvents',
  async ({ cursor } = {}, { extra, rejectWithValue }) => {
    try {
      const res = await extra.services.events.listEvents(cursor)
      console.log('fetchAllEvents', res)
      return res
    } catch (e) {
      return rejectWithValue(
        extra.extractErrorMessage(e, 'Failed to fetch events')
      )
    }
  },
  {
    condition: ({ cursor } = {}, { getState }) => {
      const state = getState();
      const home = state.events.home;
      const lastCursor = home.nextCursor;

      const now = Date.now();

      const sameCursor = lastCursor === cursor;
      const fresh =
        home.lastFetchedAt &&
        now - home.lastFetchedAt < 500;

      if (home.isLoading) return false;
      if (sameCursor && fresh) return false;

      return true;
    }
  }
)
