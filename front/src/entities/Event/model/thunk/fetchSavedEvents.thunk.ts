import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { EventDTO } from '@/shared/libs/services/eventsService/events.type.ts';
import type { PaginatedResponse } from '@/shared/types';

export const fetchSavedEventsThunk = createAsyncThunk<
  PaginatedResponse<EventDTO>,
  { cursor?: string | null },
  ThunkAPI
>(
  'events/fetchSavedEvents',
  async ({ cursor }, { extra, rejectWithValue }) => {
    try {
      return await extra.services.events.getSavedEvents({ cursor });
    } catch {
      return rejectWithValue('Failed to fetch saved events.');
    }
  }
)
