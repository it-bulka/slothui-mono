import { EventCard, useEventsByUserSelect } from '@/entities';
import { SubscribeEventButton } from '@/features';
import { Typography } from '@/shared/ui';

export const UserEventContent = ({ userId }: { userId: string }) => {
  const { items: events } = useEventsByUserSelect(userId)

  if(!events?.length) return <Typography bold>No any event yet</Typography>

  return events.map((item) => (
    <EventCard
      id={item.id}
      key={item.id}
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
}