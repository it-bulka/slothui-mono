import { SubscribeEventButton } from '@/features';
import { EventCardWithDelete } from '@/features/DeleteEvent';
import type { EventDTO } from '@/shared/libs/services/eventsService/events.type.ts';
import { formatDate, startOfToday, isEventPast } from '@/shared/libs';
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { getMyEventsPage, getUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { useMemo } from 'react';

export const EventsList = ({ events, withActions }: { events: EventDTO[], withActions?: boolean }) => {
  const currentUserId = useAuthUserIdSelector()
  const today = useMemo(startOfToday, [])

  return events.map((item) => {
    const isMe = currentUserId === item.organizer.id

    return (
      <EventCardWithDelete
        id={item.id}
        key={item.id}
        title={item.title}
        description={item.description}
        date={formatDate(item.date)}
        location={typeof item.location === 'object' ? item.location?.address : item.location}
        category={item.category}
        coverUrl={item.coverUrl}
        onlineUrl={item.onlineUrl}
        profileLink={isMe ? getMyEventsPage() : getUserPage(item.organizer.id)}
        organizer={{ username: item.organizer.username, avatar: item.organizer.avatar }}
        participantsCount={item.participantsCount || 0}
        isOwner={isMe}
        isPast={isEventPast(item.date, today)}
        actions={withActions && (
          <SubscribeEventButton eventId={item.id} isSubscribed={item.isSubscribed} />
        )}
      />
    )
  })
}
