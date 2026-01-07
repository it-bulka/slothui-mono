import type { EntityState } from '@reduxjs/toolkit'
import type { EventDTO } from '@/shared/libs/services/eventsService/events.type.ts';
import type { EventParticipant } from '@/shared/libs/services/eventsService/events.type.ts';

type FeedState = {
  ids: string[]
  isLoading: boolean
  error?: string
  hasMore: boolean
  nextCursor?: string | null
  lastFetchedAt?: number
}

type ParticipantsFeedState = {
  items: EventParticipant[]
  ids: string[]
  isLoading: boolean
  error?: string
  hasMore: boolean
  nextCursor?: string | null
  lastFetchedAt?: number
}

export interface EventsState extends EntityState<EventDTO, string> {
  home: FeedState
  eventsByUser: Record<string, FeedState>
  subscribed: FeedState
  upcoming: FeedState

  participants: Record<string, ParticipantsFeedState> // key = eventId
}
