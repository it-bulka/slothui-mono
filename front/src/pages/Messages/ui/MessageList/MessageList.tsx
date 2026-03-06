import { Virtuoso } from 'react-virtuoso'
import { useChatMetaSelect } from '@/entities'
import { Typography } from '@/shared/ui'
import { useRef, useMemo, memo } from 'react'
import type { VirtuosoHandle } from 'react-virtuoso'
import {
  useScrollToBottom,
  usePaginationRestore,
  useUnreadMessages,
  useCurrentChat,
  useMessageRow,
  type MessagesVirtuosoContext,
  useLoadMessages
} from '../../model'
import { NewMsgAmountBadge } from '../NewMsgAmountBadge/NewMsgAmountBadge'
import type { MessageDto } from '@/shared/types';

interface MessageListProps {
  chatId: string,
  authUserId: string
}

// TODO: fix blicks
export const MessageList = memo(({
   chatId,
   authUserId,
}: MessageListProps) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null)

  const { messages: rawMsgs } = useCurrentChat()
  const reversedMsgs = useMemo(() => [...rawMsgs].reverse(), [rawMsgs])
  const { onLoadMore } = useLoadMessages({ chatId, isMessages: !!rawMsgs.length })
  const { loading, hasMore } = useChatMetaSelect(chatId)

  const {
    isAtBottom,
    newMessagesCount,
    handleBottomChange
  } = useUnreadMessages(reversedMsgs)

  const { startIndex, handleStartReached } = usePaginationRestore({
    msgs: reversedMsgs,
    loading,
    hasMore,
    onLoadMore,
    isAtBottom
  })

  const scrollToBottom = useScrollToBottom(virtuosoRef, reversedMsgs)
  const row = useMessageRow()

  return (
    <div className="relative bg-underground-secondary grow">
      <Virtuoso<MessageDto, MessagesVirtuosoContext>
        ref={virtuosoRef}
        data={reversedMsgs}
        initialTopMostItemIndex={0}
        firstItemIndex={startIndex} // in virtual list, overscanTop
        followOutput={isAtBottom ? 'smooth' : false}
        itemContent={row}
        computeItemKey={(_index, msg) => msg.id}
        context={{ msgs: reversedMsgs, authUserId, firstItemIndex: startIndex }}
        atBottomStateChange={handleBottomChange}
        rangeChanged={(range) => {
          if(range.startIndex !== startIndex) return
          handleStartReached()
        }}
        className="scrollbar-hide"
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