import type { PaginatedResponse } from './paginatedResponse.types.ts';
import type { EventDTO } from '../libs/services/eventsService/events.type.ts';

export type EventsPayload = PaginatedResponse<EventDTO>