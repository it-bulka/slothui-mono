import { EventCard } from '@/entities';
import { SubscribeEventButton } from '@/features';
import type { EventDTO } from '@/shared/libs/services/eventsService/events.type.ts';
import { Typography } from '@/shared/ui';

export const UserEventContent = () => {
  const events: EventDTO[] = []

  if(!events?.length) return <Typography bold>No any event yet</Typography>

  return events.map(() => (
    <EventCard
      id="1"
      title="Frontend Meetup"
      description="Зустріч розробників для обговорення React, TypeScript і FSD архітектури."
      date="2025-11-12"
      location="Київ, UNIT.City"
      organizer={{ name: 'Iv Li', avatar: '/avatars/ivli.png' }}
      participantsCount={57}
      actions={(
        <SubscribeEventButton
          eventId={"1"}
        />
      )}
    />
  ))
}