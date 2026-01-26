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

    if(!currentUser) return rejectWithValue('User not authorised')
    try {
      const event = await extra.services.events.createEvent(data)

      return { event, currentUserId: currentUser.id }
    } catch (e) {
      return rejectWithValue(
        extra.extractErrorMessage(e, 'Failed to create event')
      )
    }
  }
)
