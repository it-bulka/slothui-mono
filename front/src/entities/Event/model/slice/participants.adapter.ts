import { createEntityAdapter } from '@reduxjs/toolkit';
import type { EventParticipant } from '@/shared/libs/services/eventsService/events.type.ts';

export const participantsAdapter = createEntityAdapter<EventParticipant, string>({
  selectId: event => event.id,
})