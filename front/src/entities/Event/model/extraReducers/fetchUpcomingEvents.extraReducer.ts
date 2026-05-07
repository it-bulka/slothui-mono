import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { EventsState } from '../types/event.type.ts';
import { eventsAdapter } from '../slice/event.adapter.ts';
import { fetchUpcomingEventsThunk } from '../thunk/fetchUpcomingEventsThunk.ts';

export const fetchUpcomingEventsExtraReducer = (builder: ActionReducerMapBuilder<EventsState>) => {
  builder
    .addCase(fetchUpcomingEventsThunk.pending, (state) => {
      state.upcoming.isLoading = true
      state.upcoming.error = undefined
    })
    .addCase(fetchUpcomingEventsThunk.fulfilled, (state, action) => {
      const { items: events, nextCursor, hasMore } = action.payload

      eventsAdapter.upsertMany(state, events)

      const existingIds = new Set(state.upcoming.ids)
      events.forEach(e => { if (!existingIds.has(e.id)) state.upcoming.ids.push(e.id) })
      state.upcoming.isLoading = false
      state.upcoming.hasMore = hasMore
      state.upcoming.nextCursor = nextCursor
      state.upcoming.lastFetchedAt = Date.now()
      state.upcoming.lastFetchedCursor = action.meta.arg.cursor ?? null
    })
    .addCase(fetchUpcomingEventsThunk.rejected, (state, action) => {
      if (action.payload === 'cached') {
        state.upcoming.isLoading = false
        return
      }

      state.upcoming.isLoading = false
      state.upcoming.hasMore = false
      state.upcoming.error = action.payload as string
    })
}
