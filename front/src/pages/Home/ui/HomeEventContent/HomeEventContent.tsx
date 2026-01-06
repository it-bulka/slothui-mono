import { EventCard, useEventsHomeSelect } from '@/entities';
import { SubscribeEventButton } from '@/features';
import { Typography } from '@/shared/ui';
import { memo } from 'react';

export const HomeEventContent = memo(() => {
  const { items: events } = useEventsHomeSelect()

  if(!events?.length) return <Typography bold>No any event yet</Typography>

  return events.map((item) => (
    <EventCard
      id={item.id}
      title={item.title}
      description={item.description}
      date={item.date}
      location={item.location}
      organizer={{ name: item.organizer.name, avatar: item.organizer.avatar }}
      participantsCount={item.participantsCount || 0}
      actions={(
        <SubscribeEventButton eventId={item.id} />
      )}
    />
  ))
})

HomeEventContent.displayName = 'HomeEventContent'