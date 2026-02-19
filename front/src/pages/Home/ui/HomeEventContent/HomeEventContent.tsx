import { EventCard, useEventsHomeSelect } from '@/entities';
import { SubscribeEventButton } from '@/features';
import { Typography } from '@/shared/ui';
import { memo } from 'react';
import { formatDate } from '@/shared/libs';
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { getMyEventsPage, getUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';

export const HomeEventContent = memo(() => {
  const { items: events } = useEventsHomeSelect()
  const currentUserId = useAuthUserIdSelector()

  if(!events?.length) return <Typography bold>No any event yet</Typography>

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
        actions={(
          <SubscribeEventButton eventId={item.id} />
        )}
      />
    )
  })
})

HomeEventContent.displayName = 'HomeEventContent'