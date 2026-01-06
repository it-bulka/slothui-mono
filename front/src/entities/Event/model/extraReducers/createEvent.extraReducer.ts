import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { EventsState } from '../types/event.type.ts';
import { createEventThunk } from '../thunk/createEvent.thunk.ts';
import { eventsAdapter } from '../slice/event.adapter.ts';

export const createEventExtraReducer = (builder: ActionReducerMapBuilder<EventsState>) => {
  builder.addCase(createEventThunk.fulfilled, (state, action) => {
    eventsAdapter.upsertOne(state, action.payload)

    // invalidate feeds
    state.home.lastFetchedAt = undefined
    state.subscribed.lastFetchedAt = undefined
  })
}
