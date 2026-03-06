import { useCallback, useRef, useMemo } from 'react'
import type { MessageDto } from '@/shared/types';

interface PaginationRestoreProps {
  msgs: MessageDto[]
  loading: boolean
  hasMore: boolean
  onLoadMore?: () => void
  isAtBottom: boolean
}

export const usePaginationRestore = ({
  msgs,
  loading,
  hasMore,
  onLoadMore,
  isAtBottom
}: PaginationRestoreProps) => {
  const restoreIdRef = useRef<string | null>(null) // top item id at the moment of load more data
  const startPointRef = useRef<number>(0)     // last first point of virtuoso virtual list (at top)

  const handleStartReached = useCallback(() => {
    if (!loading && hasMore) {
      restoreIdRef.current = msgs[0]?.id ?? null
      onLoadMore?.()
    }
  }, [loading, hasMore, msgs, onLoadMore, isAtBottom])

  const startIndex = useMemo(() => {
    const startIndex = msgs.findIndex(m => m.id === restoreIdRef.current) ;
    startPointRef.current = startPointRef.current + (startIndex * -1) // * -1  cause go to the top
    return startPointRef.current
  }, [msgs, isAtBottom])


  return {
    handleStartReached,
    restoreIdRef,
    startIndex
  }
}