import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { EventsState } from '../types/event.type.ts';
import { fetchAllEventsThunk } from '../thunk/fetchAllEvents.thunk.ts';
import { eventsAdapter } from '../slice/event.adapter.ts';

export const fetchAllEventsExtraReducer = (builder: ActionReducerMapBuilder<EventsState>) => {
  builder
    .addCase(fetchAllEventsThunk.pending, (state) => {
      state.home.isLoading = true
      state.home.error = undefined
    })
    .addCase(fetchAllEventsThunk.fulfilled, (state, action) => {
      const { items: events, nextCursor, hasMore } = action.payload

      eventsAdapter.upsertMany(state, events)

      state.home.ids.push(...events.map(e => e.id))
      state.home.isLoading = false
      state.home.hasMore = hasMore
      state.home.nextCursor = nextCursor
      state.home.lastFetchedAt = Date.now()
    })
    .addCase(fetchAllEventsThunk.rejected, (state, action) => {
      if (action.payload === 'cached') {
        state.home.isLoading = false
        return
      }

      state.home.isLoading = false
      state.home.error = action.payload
    })
}
