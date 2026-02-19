import { EventCard } from '@/entities';
import { SubscribeEventButton } from '@/features';
import type { EventDTO } from '@/shared/libs/services/eventsService/events.type.ts';
import { formatDate } from '@/shared/libs';
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { getMyEventsPage, getUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';

export const EventsList = ({ events, withActions }: { events: EventDTO[], withActions?: boolean }) => {
  const currentUserId = useAuthUserIdSelector()
  return events.map((item) => {
    const isMe = currentUserId === item.organizer.id

    return (
      <EventCard
        id={item.id}
        key={item.id}
        title={item.title}
        description={item.description}
        date={formatDate(item.date)}
        location={item.location}
        profileLink={isMe ? getMyEventsPage() : getUserPage(item.organizer.id)}
        organizer={{ username: item.organizer.username, avatar: item.organizer.avatar }}
        participantsCount={item.participantsCount || 0}
        actions={withActions && (
          <SubscribeEventButton eventId={item.id} />
        )}
      />)
  })
}