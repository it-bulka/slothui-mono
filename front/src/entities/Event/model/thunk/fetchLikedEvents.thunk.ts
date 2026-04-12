import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { EventDTO } from '@/shared/libs/services/eventsService/events.type.ts';
import type { PaginatedResponse } from '@/shared/types';

export const fetchLikedEventsThunk = createAsyncThunk<
  PaginatedResponse<EventDTO>,
  { cursor?: string | null },
  ThunkAPI
>(
  'events/fetchLikedEvents',
  async ({ cursor }, { extra, rejectWithValue }) => {
    try {
      return await extra.services.events.getLikedEvents({ cursor });
    } catch {
      return rejectWithValue('Failed to fetch liked events.');
    }
  }
)
