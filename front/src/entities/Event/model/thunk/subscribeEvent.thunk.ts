import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';

export const subscribeToEventThunk = createAsyncThunk<
  { eventId: string },
  { eventId: string },
  ThunkAPI
>(
  'events/subscribe',
  async ({ eventId }, { rejectWithValue, extra }) => {
    try {
      await extra.services.events.subscribeEvent(eventId)
      return { eventId }
    } catch {
      return rejectWithValue('subscribe_failed')
    }
  }
)
