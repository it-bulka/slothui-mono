import type { CreateEventDTO, EventDTO } from '@/shared/libs/services/eventsService/events.type.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';

export const createEventThunk = createAsyncThunk<
  EventDTO,
  CreateEventDTO,
  ThunkAPI
>(
  'events/createEvent',
  async (data, { extra, rejectWithValue }) => {
    try {
      return await extra.services.events.createEvent(data)
    } catch (e) {
      return rejectWithValue(
        extra.extractErrorMessage(e, 'Failed to create event')
      )
    }
  }
)
