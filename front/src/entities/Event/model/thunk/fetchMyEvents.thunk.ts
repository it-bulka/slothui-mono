import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkAPI } from '@/shared/config/redux'
import type { EventDTO } from '@/shared/libs/services/eventsService/events.type.ts';
import type { PaginatedResponse } from '@/shared/types';
import { selectAuthUser } from '@/entities/AuthUser';

export const fetchMyEventsThunk = createAsyncThunk<
  { data: PaginatedResponse<EventDTO>, currentUserId: string },
  { cursor?: string | null },
  ThunkAPI
>(
  'events/fetchMyEvents',
  async (arg, { extra, rejectWithValue, getState }) => {
    const currentUser = selectAuthUser(getState());

    if(!currentUser) return rejectWithValue('User not authorised')

    try {
      const data = await extra.services.events.getMyEvents(arg.cursor)

      return { data: data, currentUserId: currentUser.id }
    } catch (e) {
      return rejectWithValue(
        extra.extractErrorMessage(e, 'Failed to fetch events')
      )
    }
  }
)
