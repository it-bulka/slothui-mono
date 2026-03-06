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
    if (isAtBottom) return startPointRef.current
    if (!restoreIdRef.current) return startPointRef.current

    const index = msgs.findIndex(m => m.id === restoreIdRef.current)
    if (index !== -1) {
      startPointRef.current -= index
    }
    restoreIdRef.current = null

    return startPointRef.current
  }, [msgs, isAtBottom])


  return {
    handleStartReached,
    restoreIdRef,
    startIndex
  }
}