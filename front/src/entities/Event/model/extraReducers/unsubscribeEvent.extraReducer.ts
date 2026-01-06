import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { EventsState } from '../types/event.type.ts';
import { unsubscribeFromEventThunk } from '../thunk/unsubscribeFromEvent.thunk.ts';

export const unsubscribeEventExtraReducer = (
  builder: ActionReducerMapBuilder<EventsState>
) => {
  builder.addCase(unsubscribeFromEventThunk.fulfilled, (state, action) => {
    const event = state.entities[action.payload.eventId]
    if (!event) return

    event.isSubscribed = false
    event.participantsCount = Math.max(0, event.participantsCount - 1)

    state.subscribed.ids.filter(id => id !== event.id)
  })
}