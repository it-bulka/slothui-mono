import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { EventsState } from '../types/event.type.ts';
import { createEventThunk } from '../thunk/createEvent.thunk.ts';
import { eventsAdapter } from '../slice/event.adapter.ts';
import { prependUniqueIds } from '@/shared/libs';

export const createEventExtraReducer = (builder: ActionReducerMapBuilder<EventsState>) => {
  builder.addCase(createEventThunk.fulfilled, (state, action) => {
    eventsAdapter.upsertOne(state, action.payload.event)

    const currentUser = action.payload.currentUserId
    state.eventsByUser[currentUser] ??= {
      ids: [],
      isLoading: false,
      hasMore: true,
      nextCursor: null,
    }

    const feed = state.eventsByUser[currentUser]
    feed.ids = prependUniqueIds(feed.ids, [{ id: action.payload.event.id }])
  })
}
