import { EventDetails } from '@/entities/Event';
import { useEventsService } from '@/shared/libs/services';
import { useEffect, useState } from 'react';
import type { EventDTO } from '@/shared/libs/services/eventsService/events.type.ts';
import { useNavigate } from 'react-router';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';
import { memo } from 'react';
import { formatDate } from '@/shared/libs';

export const EventInfo = memo(({id}: {id: string}) => {
  const eventsService = useEventsService();
  const [eventData, setEventData] = useState<EventDTO | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    eventsService.getEvent(id)
      .then((data) => setEventData(data))
      .catch(() => navigate(RoutePaths.not_found));
  }, [eventsService, id, navigate]);

  if (!eventData) return <p>Loading...</p>;

  const position: [number, number] | null =
    eventData.location
      ? [
          (eventData.location as unknown as { latitude: number; longitude: number }).latitude,
          (eventData.location as unknown as { latitude: number; longitude: number }).longitude,
        ]
      : null;

  return (
    <EventDetails
      id={eventData.id}
      title={eventData.title}
      description={eventData.description}
      date={formatDate(eventData.date)}
      location={
        (eventData.location as unknown as { address?: string; city?: string } | undefined)?.address ||
        (eventData.location as unknown as { city?: string } | undefined)?.city ||
        undefined
      }
      position={position}
      organizer={eventData.organizer}
      category={eventData.category}
      coverUrl={eventData.coverUrl}
      onlineUrl={eventData.onlineUrl}
    />
  )
})

EventInfo.displayName = 'EventInfo';
