import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { EventsState } from '../types/event.type.ts';
import { fetchEventsByUserThunk } from '../thunk/fetchEventsByUser.thunk.ts';
import { eventsAdapter } from '../slice/event.adapter.ts';

export const fetchEventsByUserExtraReducer = (builder: ActionReducerMapBuilder<EventsState>) => {
  builder
    .addCase(fetchEventsByUserThunk.pending, (state, action) => {
      const { userId } = action.meta.arg;
      state.eventsByUser[userId].isLoading = true
      state.eventsByUser[userId].error = undefined
    })
    .addCase(fetchEventsByUserThunk.fulfilled, (state, action) => {
      const { userId } = action.meta.arg;
      const { items: events, nextCursor, hasMore } = action.payload

      eventsAdapter.upsertMany(state, events)

      state.eventsByUser[userId].ids.push(...events.map(e => e.id))
      state.eventsByUser[userId].isLoading = false
      state.eventsByUser[userId].hasMore = hasMore
      state.eventsByUser[userId].nextCursor = nextCursor
      state.eventsByUser[userId].lastFetchedAt = Date.now()
    })
    .addCase(fetchEventsByUserThunk.rejected, (state, action) => {
      const { userId } = action.meta.arg;

      if (action.payload === 'cached') {
        state.eventsByUser[userId].isLoading = false
        return
      }

      state.eventsByUser[userId].isLoading = false
      state.eventsByUser[userId].error = action.payload
    })
}