import { EventDetails } from '@/entities/Event';
import { useEventsService } from '@/shared/libs/services';
import { useEffect, useState } from 'react';
import type { EventDTO } from '@/shared/libs/services/eventsService/events.type.ts';
import { useNavigate } from 'react-router';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';
import { memo } from 'react';

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

  if (!eventData) return <p>lading...</p>;

  return (
    <EventDetails
      id={eventData.id}
      title={eventData.title}
      description={eventData.description}
      date={eventData.date}
      location={eventData.location}
      position={[7878,99.9]}
      organizer={eventData.organizer}
    />
  )
})

EventInfo.displayName = 'EventInfo';