import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { EventsState } from '../types/event.type.ts';
import { eventsAdapter } from '../slice/event.adapter.ts';
import { fetchSubscribedEventsThunk } from '../thunk/fetchSubscribedEvents.thunk.ts';

export const fetchSubscribedEventsExtraReducer = (builder: ActionReducerMapBuilder<EventsState>) => {
  builder
    .addCase(fetchSubscribedEventsThunk.pending, (state) => {
      state.subscribed.isLoading = true
      state.subscribed.error = undefined
    })
    .addCase(fetchSubscribedEventsThunk.fulfilled, (state, action) => {
      const { items: events, nextCursor, hasMore } = action.payload

      eventsAdapter.upsertMany(state, events)

      state.subscribed.ids.push(...events.map(e => e.id))
      state.subscribed.isLoading = false
      state.subscribed.hasMore = hasMore
      state.subscribed.nextCursor = nextCursor
      state.subscribed.lastFetchedAt = Date.now()
    })
    .addCase(fetchSubscribedEventsThunk.rejected, (state, action) => {
      if (action.payload === 'cached') {
        state.subscribed.isLoading = false
        return
      }

      state.subscribed.isLoading = false
      state.subscribed.error = action.payload
    })
}