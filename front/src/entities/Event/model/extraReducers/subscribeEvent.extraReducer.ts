import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { EventsState } from '../types/event.type.ts';
import { subscribeToEventThunk } from '../thunk/subscribeEvent.thunk.ts';

export const subscribeEventExtraReducer = (
  builder: ActionReducerMapBuilder<EventsState>
) => {
  builder.addCase(subscribeToEventThunk.fulfilled, (state, action) => {
    const event = state.entities[action.payload.eventId]
    if (!event) return

    event.isSubscribed = true
    event.participantsCount += 1

    if(!state.subscribed.ids.includes(event.id)) {
      state.subscribed.ids.push(event.id)
    }
  })
}


