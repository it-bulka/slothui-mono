import { EventDetails } from '@/entities/Event';
import { useEventsService } from '@/shared/libs/services';
import { useEffect, useState, useCallback } from 'react';
import type { EventDTO } from '@/shared/libs/services/eventsService/events.type.ts';
import { useNavigate } from 'react-router';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';
import { memo } from 'react';
import { formatDate } from '@/shared/libs';
import { SubscribeEventButton } from '@/features';

export const EventInfo = memo(({id, onSubscribedChange}: {id: string, onSubscribedChange?: () => void}) => {
  const eventsService = useEventsService();
  const [eventData, setEventData] = useState<EventDTO | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    eventsService.getEvent(id)
      .then((data) => setEventData(data))
      .catch(() => navigate(RoutePaths.not_found));
  }, [eventsService, id, navigate]);

  const handleSubscribedChange = useCallback(() => {
    setEventData(prev => {
      if (!prev) return prev;
      const subscribed = !prev.isSubscribed;
      return {
        ...prev,
        isSubscribed: subscribed,
        participantsCount: subscribed
          ? (prev.participantsCount ?? 0) + 1
          : Math.max(0, (prev.participantsCount ?? 0) - 1),
      };
    });
    onSubscribedChange?.();
  }, [onSubscribedChange]);

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
      participantsCount={eventData.participantsCount}
      actions={
        <SubscribeEventButton
          eventId={eventData.id}
          isSubscribed={eventData.isSubscribed}
          onSubscribedChange={handleSubscribedChange}
        />
      }
    />
  )
})

EventInfo.displayName = 'EventInfo';
