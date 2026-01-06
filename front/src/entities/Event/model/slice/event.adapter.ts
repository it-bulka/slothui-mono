import { createEntityAdapter } from '@reduxjs/toolkit';
import type { EventDTO } from '@/shared/libs/services/eventsService/events.type.ts';
import type { RootState } from '@/app/config';

export const eventsAdapter = createEntityAdapter<EventDTO, string>({
  selectId: event => event.id,
})

export const {
  selectById: selectEventById,
  selectEntities: selectEventEntities,
} = eventsAdapter.getSelectors(
  (state: RootState) => state.events
)