import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { EventsState } from '../types/event.type.ts';
import { fetchEventByIdThunk } from '../thunk/fetchEventById.thunk.ts';
import { eventsAdapter } from '../slice/event.adapter.ts';

export const fetchEventsByIdExtraReducer = (builder: ActionReducerMapBuilder<EventsState>) => {
  builder
    .addCase(fetchEventByIdThunk.fulfilled, (state, action) => {
      eventsAdapter.upsertOne(state, action.payload)
    })
    .addCase(fetchEventByIdThunk.rejected, (_, action) => {
      if (action.payload === 'cached') return
    })
}