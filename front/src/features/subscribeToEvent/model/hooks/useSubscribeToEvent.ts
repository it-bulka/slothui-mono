import { useState } from 'react'
import { useEventsService } from '@/shared/libs/services';

export function useSubscribeToEvent() {
  const [loading, setLoading] = useState(false)
  const eventsService = useEventsService()

  const toggleSubscription = async (eventId: string, isSubscribed?: boolean) => {
    setLoading(true)
    try {
      if (isSubscribed) {
        await eventsService.unsubscribeEvent(eventId)
      } else {
        await eventsService.subscribeEvent(eventId)
      }
    } finally {
      setLoading(false)
    }
  }

  return { toggleSubscription, loading }
}
