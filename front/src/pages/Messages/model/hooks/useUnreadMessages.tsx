import { useState, useRef, useEffect, useMemo } from 'react'
import type { MessageDto } from '@/shared/types';

export const useUnreadMessages = (msgs: MessageDto[]) => {
  const [isAtBottom, setIsAtBottom] = useState(true)
  const lastSeenIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (isAtBottom && msgs.length) {
      lastSeenIdRef.current = msgs[msgs.length - 1].id
    }
  }, [isAtBottom, msgs])

  const newMessagesCount = useMemo(() => {
    if (isAtBottom || !lastSeenIdRef.current) return 0

    const index = msgs.findIndex(m => m.id === lastSeenIdRef.current)

    if (index === -1) return 0

    return msgs.length - index - 1
  }, [msgs, isAtBottom])

  const handleBottomChange = (atBottom: boolean) => {
    setIsAtBottom(atBottom)
  }

  return {
    isAtBottom,
    newMessagesCount,
    handleBottomChange
  }
}