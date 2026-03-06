import { useCallback, type RefObject } from 'react'
import type { MessageDto } from '@/shared/types';
import type { VirtuosoHandle } from 'react-virtuoso';

export const useScrollToBottom = (virtuosoRef: RefObject<VirtuosoHandle | null>, msgs: MessageDto[]) => {
  return useCallback(() => {
    virtuosoRef.current?.scrollToIndex({
      index: msgs.length - 1,
      align: 'end',
      behavior: 'smooth'
    })
  }, [msgs, virtuosoRef])
}