import { useState } from 'react'
import { useAppDispatch } from '@/shared/config/redux';
import { subscribeToEventThunk } from '@/entities/Event/model/thunk/subscribeEvent.thunk.ts';
import { unsubscribeFromEventThunk } from '@/entities/Event/model/thunk/unsubscribeFromEvent.thunk.ts';

export function useSubscribeToEvent() {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  const toggleSubscription = async (eventId: string, isSubscribed?: boolean) => {
    setLoading(true)
    try {
      if (isSubscribed) {
        await dispatch(unsubscribeFromEventThunk({ eventId }))
      } else {
        await dispatch(subscribeToEventThunk({ eventId }))
      }
    } finally {
      setLoading(false)
    }
  }

  return { toggleSubscription, loading }
}
