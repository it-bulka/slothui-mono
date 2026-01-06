import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';

export const unsubscribeFromEventThunk = createAsyncThunk<
  { eventId: string },
  { eventId: string },
  ThunkAPI
>(
  'events/unsubscribe',
  async ({ eventId }, { rejectWithValue, extra }) => {
    try {
      await extra.services.events.unsubscribeEvent(eventId)
      return { eventId }
    } catch {
      return rejectWithValue('unsubscribe_failed')
    }
  }
)
