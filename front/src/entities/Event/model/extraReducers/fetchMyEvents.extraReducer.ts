import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { EventsState } from '../types/event.type.ts';
import { fetchMyEventsThunk } from '../thunk';
import { eventsAdapter } from '../slice/event.adapter.ts';
import { addUniqueIds } from '@/shared/libs';

export const fetchMyEventsExtraReducer = (builder: ActionReducerMapBuilder<EventsState>) => {
  builder.addCase(fetchMyEventsThunk.fulfilled, (state, action) => {
    eventsAdapter.addMany(state, action.payload.data.items)

    const currentUser = action.payload.currentUserId
    state.eventsByUser[currentUser] ??= {
      ids: [],
      isLoading: false,
      hasMore: true,
      nextCursor: null,
    }

    const feed = state.eventsByUser[currentUser]
    feed.ids = addUniqueIds(feed.ids, action.payload.data.items)
    feed.isLoading = false
    feed.hasMore = action.payload.data.hasMore
    feed.nextCursor = action.payload.data.nextCursor
  })
}
