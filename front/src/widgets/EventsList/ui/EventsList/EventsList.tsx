import { EventCard } from '@/entities';
import { SubscribeEventButton } from '@/features';
import type { EventDTO } from '@/shared/libs/services/eventsService/events.type.ts';

export const EventsList = ({ events, withActions }: { events: EventDTO[], withActions?: boolean }) => {
  return events.map((item) => (
    <EventCard
      id={item.id}
      title={item.title}
      description={item.description}
      date={item.date}
      location={item.location}
      organizer={{ name: item.organizer.name, avatar: item.organizer.avatar }}
      participantsCount={item.participantsCount || 0}
      actions={withActions && (
        <SubscribeEventButton eventId={item.id} />
      )}
    />))
}