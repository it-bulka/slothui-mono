import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkAPI } from '@/shared/config/redux'
import type { EventDTO } from '@/shared/libs/services/eventsService/events.type.ts';

export const fetchEventByIdThunk = createAsyncThunk<
  EventDTO,
  { eventId: string; force?: boolean },
  ThunkAPI
>(
  'events/fetchEventById',
  async ({ eventId, force }, { extra, getState, rejectWithValue }) => {
    const state = getState().events
    const cached = state.entities[eventId]

    if (cached && !force) {
      return rejectWithValue('cached')
    }

    try {
      return await extra.services.events.getEvent(eventId)
    } catch (e) {
      return rejectWithValue(
        extra.extractErrorMessage(e, 'Failed to fetch event')
      )
    }
  }
)
