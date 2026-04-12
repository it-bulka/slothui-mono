import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { EventsState } from '../types/event.type.ts';
import { eventsAdapter } from '../slice/event.adapter.ts';
import { fetchSavedEventsThunk } from '../thunk/fetchSavedEvents.thunk.ts';

export const fetchSavedEventsExtraReducer = (builder: ActionReducerMapBuilder<EventsState>) => {
  builder
    .addCase(fetchSavedEventsThunk.pending, (state) => {
      state.saved.isLoading = true
      state.saved.error = undefined
    })
    .addCase(fetchSavedEventsThunk.fulfilled, (state, action) => {
      const { items: events, nextCursor, hasMore } = action.payload

      eventsAdapter.upsertMany(state, events)

      state.saved.ids.push(...events.map(e => e.id))
      state.saved.isLoading = false
      state.saved.hasMore = hasMore
      state.saved.nextCursor = nextCursor
      state.saved.lastFetchedAt = Date.now()
    })
    .addCase(fetchSavedEventsThunk.rejected, (state, action) => {
      state.saved.isLoading = false
      state.saved.hasMore = false
      state.saved.error = action.payload as string
    })
}
