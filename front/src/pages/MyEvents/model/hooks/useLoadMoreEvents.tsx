import { useCallback } from 'react';
import type { EventsContentType } from '@/pages/MyEvents/model/types/eventOption.type.ts';
import { useFetchUpcomingEvents, useFetchSubscribedEvents, useFetchEventsByUser } from '@/entities';

export const useLoadMoreEvents = () => {
  const { fetchUpcomingEvents } = useFetchUpcomingEvents()
  const { fetchSubscribedEvents } = useFetchSubscribedEvents()
  const { fetchEventsByUser } = useFetchEventsByUser()

  const loadMore = useCallback(({ type, nextCursor, userId }: { type: EventsContentType, nextCursor?: string | null, userId: string }) => {
    if(type === 'upcoming') {
      fetchUpcomingEvents({ cursor: nextCursor})
    } else if (type === 'subscribed') {
      fetchSubscribedEvents({ cursor: nextCursor})
    } else if (type === 'your') {
      fetchEventsByUser({ cursor: nextCursor, userId})
    }
  }, [fetchUpcomingEvents, fetchEventsByUser, fetchSubscribedEvents]);

  return { loadMore };
};
