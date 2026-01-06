import type { EventParticipant } from '@/shared/libs/services/eventsService/events.type.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { PaginatedResponse } from '@/shared/types';
import type { ThunkAPI } from '@/shared/config/redux';

export const fetchEventParticipantsThunk = createAsyncThunk<
  PaginatedResponse<EventParticipant>,
  { eventId: string; cursor?: string | null },
  ThunkAPI
>(
  'events/fetchEventParticipants',
  async ({ eventId, cursor }, { extra, getState, rejectWithValue }) => {
    const state = getState().events
    const feed = state.participants[eventId]
    const now = Date.now()

    if (
      feed &&
      !cursor &&
      !feed.hasMore &&
      feed.lastFetchedAt &&
      now - feed.lastFetchedAt < 60_000
    ) {
      return rejectWithValue('cached')
    }

    try {
      return await extra.services.events.listEventParticipants(
        eventId,
        cursor ?? undefined
      )
    } catch (e) {
      return rejectWithValue(
        extra.extractErrorMessage(e, 'Failed to fetch participants')
      )
    }
  }
)
