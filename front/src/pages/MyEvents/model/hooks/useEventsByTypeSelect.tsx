import { useMemo } from 'react';
import type { EventsContentType } from '@/pages/MyEvents/model/types/eventOption.type';
import { useEventsByUserSelect, useSubscribedEventsSelect, useUpcomingEventsSelect } from '@/entities';

export const useEventsByTypeSelect = (userId: string, type: EventsContentType) => {
  const userEvents = useEventsByUserSelect(userId);
  const subscribedEvents = useSubscribedEventsSelect();
  const upcomingEvents = useUpcomingEventsSelect();

  const data = useMemo(() => {
    switch (type) {
      case 'your':
        return userEvents;
      case 'subscribed':
        return subscribedEvents;
      case 'upcoming':
        return upcomingEvents;
      default:
        return { items: [], isLoading: false, error: null, hasMore: true, nextCursor: null };
    }
  }, [userEvents, type, subscribedEvents, upcomingEvents]);

  return data;
};
