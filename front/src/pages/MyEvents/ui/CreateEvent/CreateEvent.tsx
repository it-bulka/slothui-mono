import { CreateEventButton, DraftEventProvider } from '@/features';
import { useCallback } from 'react';
import type { DraftEvent } from '@/features';
import { useCreateEvent } from '@/entities';
import { memo } from 'react';

export const CreateEvent = memo(() => {
  const { createEvent } = useCreateEvent();

  const onEventCreate = useCallback((event: DraftEvent) => {
    let location;
    if(event.latitude && event.longitude) {
      location = {
        address: event.locationName,
        latitude: event.latitude,
        longitude: event.longitude,
      }
    }
    createEvent({
      title: event.title,
      description: event.description,
      isOnline: event.isOnline,
      location,
      date: event.date.toISOString()
    })
  }, [createEvent])

  return (
    <DraftEventProvider onEventCreate={onEventCreate}>
      <CreateEventButton title={'Create Event'}/>
    </DraftEventProvider>
  )
})

CreateEvent.displayName = 'CreateEvent';