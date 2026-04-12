import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { EventsState } from '../types/event.type.ts';
import { eventsAdapter } from '../slice/event.adapter.ts';
import { fetchLikedEventsThunk } from '../thunk/fetchLikedEvents.thunk.ts';

export const fetchLikedEventsExtraReducer = (builder: ActionReducerMapBuilder<EventsState>) => {
  builder
    .addCase(fetchLikedEventsThunk.pending, (state) => {
      state.liked.isLoading = true
      state.liked.error = undefined
    })
    .addCase(fetchLikedEventsThunk.fulfilled, (state, action) => {
      const { items: events, nextCursor, hasMore } = action.payload

      eventsAdapter.upsertMany(state, events)

      state.liked.ids.push(...events.map(e => e.id))
      state.liked.isLoading = false
      state.liked.hasMore = hasMore
      state.liked.nextCursor = nextCursor
      state.liked.lastFetchedAt = Date.now()
    })
    .addCase(fetchLikedEventsThunk.rejected, (state, action) => {
      state.liked.isLoading = false
      state.liked.hasMore = false
      state.liked.error = action.payload as string
    })
}
