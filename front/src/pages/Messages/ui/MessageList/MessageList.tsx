import { Virtuoso, type ListRange } from 'react-virtuoso'
import { useChatMetaSelect } from '@/entities'
import { Typography } from '@/shared/ui'
import { useRef, useMemo, memo, useCallback } from 'react'
import type { VirtuosoHandle } from 'react-virtuoso'
import {
  useScrollToBottom,
  usePaginationRestore,
  useUnreadMessages,
  useMessageRow,
  type MessagesVirtuosoContext,
  useLoadMessages,
  useChatScrollState
} from '../../model'
import { NewMsgAmountBadge } from '../NewMsgAmountBadge/NewMsgAmountBadge'
import type { MessageDto } from '@/shared/types';

interface MessageListProps {
  chatId: string,
  authUserId: string,
  messages: MessageDto[]
}

// TODO: fix blicks
export const MessageList = memo(({
   chatId,
   authUserId,
   messages: rawMsgs,
}: MessageListProps) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null)
  const reversedMsgs = useMemo(() => [...rawMsgs].reverse(), [rawMsgs])
  const { onLoadMore } = useLoadMessages({ chatId, isMessages: !!rawMsgs.length })
  const { loading, hasMore } = useChatMetaSelect(chatId)

  const {
    isAtBottom,
    handleBottomChange,
    initRenderScrollDown
  } = useChatScrollState(reversedMsgs.length)
  const newMessagesCount = useUnreadMessages(reversedMsgs, isAtBottom)

  const { startIndex, handleStartReached } = usePaginationRestore({
    msgs: reversedMsgs,
    loading,
    hasMore,
    onLoadMore,
    isAtBottom
  })

  const scrollToBottom = useScrollToBottom(virtuosoRef, reversedMsgs)
  const row = useMessageRow()

  const handleRangeChanged = useCallback((range: ListRange) => {
    if (initRenderScrollDown.current) return

    if (range.startIndex === startIndex) {
      handleStartReached()
    }
  }, [startIndex, handleStartReached, initRenderScrollDown])

  const context = useMemo(() => ({
    msgs: reversedMsgs,
    authUserId,
    firstItemIndex: startIndex
  }), [reversedMsgs, authUserId, startIndex])

  const followOutput = useMemo(() => {
    return isAtBottom ? 'smooth' : false
  }, [isAtBottom])

  return (
    <div className="relative bg-underground-secondary grow">
      <Virtuoso<MessageDto, MessagesVirtuosoContext>
        ref={virtuosoRef}
        data={reversedMsgs}
        alignToBottom
        firstItemIndex={startIndex} // in virtual list, overscanTop
        initialTopMostItemIndex={reversedMsgs.length - 1} // show last el on mount
        followOutput={followOutput}
        itemContent={row}
        context={context}
        atBottomStateChange={handleBottomChange}
        rangeChanged={handleRangeChanged}
        className="scrollbar-hide"
        increaseViewportBy={{ top: 800, bottom: 0 }}
      />

      <div className="absolute bottom-6 right-6 pointer-events-none">
        <NewMsgAmountBadge
          className="pointer-events-auto"
          amount={newMessagesCount}
          isVisible={!isAtBottom && newMessagesCount > 0}
          onClick={scrollToBottom}
        />
      </div>

      {!reversedMsgs.length && (
        <div className="h-full flex alignCenter justifyCenter">
          <Typography bold>No any messages yet</Typography>
        </div>
      )}
    </div>
  )
})

MessageList.displayName = 'MessageList'