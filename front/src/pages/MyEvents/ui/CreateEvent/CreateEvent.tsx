import { CreateEventButton, DraftEventProvider } from '@/features';
import { useCallback } from 'react';
import type { DraftEvent } from '@/features';
import { useCreateEvent } from '@/entities';
import { memo } from 'react';

export const CreateEvent = memo(() => {
  const { createEvent } = useCreateEvent();

  const onEventCreate = useCallback((event: DraftEvent) => {
    createEvent({
      title: event.title,
      description: event.description,
      isOnline: event.isOnline,
      locationName: event.locationName,
      latitude: event.latitude,
      longitude: event.longitude,
    })
  }, [createEvent])

  return (
    <DraftEventProvider onEventCreate={onEventCreate}>
      <CreateEventButton title={'Create Event'}/>
    </DraftEventProvider>
  )
})

CreateEvent.displayName = 'CreateEvent';