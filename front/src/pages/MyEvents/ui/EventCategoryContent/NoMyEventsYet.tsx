import { NoDataYet } from '@/shared/ui'
import noEventsImage from '@/shared/assets/images/general/no_events_2.png'
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx'
import { CreateEventModal } from '@/features/CreateEvent/ui/CreateEventModal/CreateEventModal.tsx'
import { DraftEventProvider, type DraftEvent } from '@/features'
import { useCreateEvent } from '@/entities'
import { useCallback } from 'react'

const NoMyEventsYetInner = () => {
  const { isOpen, open, close } = useModalControl()

  return (
    <>
      <NoDataYet
        image={noEventsImage}
        title="No any event yet"
        subtitle="You haven't created any events yet"
        buttonLabel="Create first event"
        onButtonClick={open}
      />
      <CreateEventModal isOpen={isOpen} onClose={close} />
    </>
  )
}

export const NoMyEventsYet = () => {
  const { createEvent } = useCreateEvent()

  const onEventCreate = useCallback(async (event: DraftEvent): Promise<{ ok: boolean; error?: string }> => {
    let location;
    if (event.latitude && event.longitude) {
      location = {
        address: event.locationName,
        latitude: event.latitude,
        longitude: event.longitude,
      }
    }
    return createEvent({
      title: event.title,
      description: event.description,
      isOnline: event.isOnline,
      onlineUrl: event.isOnline ? (event.onlineUrl || undefined) : undefined,
      location,
      date: event.date.toISOString(),
      category: event.category,
    })
  }, [createEvent])

  return (
    <DraftEventProvider onEventCreate={onEventCreate}>
      <NoMyEventsYetInner />
    </DraftEventProvider>
  )
}
