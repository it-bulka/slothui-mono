import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { EventsState } from '../types/event.type.ts';
import { fetchEventParticipantsThunk } from '../thunk/fetchEventParticipants.thunk.ts';

export const fetchEventsParticipantsExtraReducer = (builder: ActionReducerMapBuilder<EventsState>) => {
  builder
    .addCase(fetchEventParticipantsThunk.pending, (state, action) => {
      const { eventId } = action.meta.arg

      state.participants[eventId] ??= {
        items: [],
        ids: [],
        isLoading: false,
        hasMore: true,
      }

      state.participants[eventId].isLoading = true
      state.participants[eventId].error = undefined
    })
    .addCase(fetchEventParticipantsThunk.fulfilled, (state, action) => {
      const { eventId } = action.meta.arg
      const { items: participants, hasMore, nextCursor } = action.payload
      const feed = state.participants[eventId]

      participants.forEach(p => {
        if (!feed.ids.includes(p.id)) {
          feed.ids.push(p.id)
          feed.items.push(p)
        }
      })

      feed.isLoading = false
      feed.hasMore = hasMore
      feed.nextCursor = nextCursor
      feed.lastFetchedAt = Date.now()
    })

    .addCase(fetchEventParticipantsThunk.rejected, (state, action) => {
      if (action.payload === 'cached') return

      const { eventId } = action.meta.arg
      state.participants[eventId].isLoading = false
      state.participants[eventId].error = action.payload as string
    })
}