import { Button } from '@/shared/ui';
import { type MouseEvent, memo } from 'react';
import { useSubscribeToEvent } from '../../model/hooks/useSubscribeToEvent.ts';

interface SubscribeEventButtonProps {
  eventId: string
  isSubscribed?: boolean
  onSubscribedChange?: (eventId: string) => void
}

export const SubscribeEventButton = memo(({
  isSubscribed,
  eventId,
  onSubscribedChange
}: SubscribeEventButtonProps) => {
  const { toggleSubscription, loading } = useSubscribeToEvent()

  const handleClick = async (e: MouseEvent) => {
    e.stopPropagation()
    await toggleSubscription(eventId, isSubscribed)
    onSubscribedChange?.(eventId)
  }
  return (
    <Button
      variant={isSubscribed ? 'secondary' : 'primary'}
      onClick={handleClick}
      disabled={loading}
    >
      {isSubscribed ? 'Subscribe' : 'Unsubscribe'}
    </Button>
  )
})

SubscribeEventButton.displayName = 'SubscribeEventButton'