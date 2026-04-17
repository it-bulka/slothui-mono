import type { CreateEventDTO, EventDTO } from '@/shared/libs/services/eventsService/events.type.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import { selectAuthUser } from '../../../AuthUser';

export const createEventThunk = createAsyncThunk<
  { event: EventDTO, currentUserId: string},
  CreateEventDTO,
  ThunkAPI
>(
  'events/createEvent',
  async (data, { extra, rejectWithValue, getState }) => {
    const currentUser = selectAuthUser(getState());

    if(!currentUser) {
      console.error('[createEventThunk] rejected: authUser.data is null — session may have expired')
      return rejectWithValue('Session expired. Please refresh and log in again.')
    }
    try {
      const event = await extra.services.events.createEvent(data)

      return { event, currentUserId: currentUser.id }
    } catch (e) {
      const msg = extra.extractErrorMessage(e, 'Failed to create event')
      console.error('[createEventThunk] HTTP error:', msg, e)
      return rejectWithValue(msg)
    }
  }
)
