import { MessageInput } from '@/widgets/MessageInput';
import { useManageActiveChatId, useCurrentChat } from './model';
import { useParams } from 'react-router';
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { CurrentChatHeader } from './ui';
import { TypingInChat } from './ui/TypingInChat/TypingInChat.tsx';
import { MessageList } from './ui/MessageList/MessageList.tsx';
import { useEffect, useRef } from 'react';
import { useChatService } from '@/shared/libs/services';
import { useAppDispatch } from '@/shared/config/redux';
import { notificationsCountersActions } from '@/entities/NotificationsCounters';

const Messages = () => {
  const { id: chatId } = useParams<{ id: string }>()
  const authUserId = useAuthUserIdSelector()
  const { typing, messages } = useCurrentChat()
  const chatService = useChatService()
  const dispatch = useAppDispatch()
  const inputWrapperRef = useRef<HTMLDivElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)

  useManageActiveChatId(chatId)

  useEffect(() => {
    if (!chatId) return
    chatService.markAsRead(chatId)
    dispatch(notificationsCountersActions.resetChatUnread({ chatId }))
  }, [chatId, chatService, dispatch])

  // Sync spacer height with MessageInput so Virtuoso's available height stays unchanged
  useEffect(() => {
    const el = inputWrapperRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      if (spacerRef.current) {
        spacerRef.current.style.height = `${entry.contentRect.height}px`
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  if(!authUserId || !chatId) return null;
  return (
    <div className="absolute inset-0 flex flex-col">
      <CurrentChatHeader />
      <MessageList chatId={chatId} authUserId={authUserId} messages={messages} />
      <TypingInChat typing={typing} />
      {/* Reserves the exact space MessageInput occupies, keeping Virtuoso height stable */}
      <div ref={spacerRef} className="shrink-0 md:hidden" />
      {/* On mobile: fixed to visual viewport bottom — stays above keyboard when open,
          returns to screen bottom when keyboard closes (no dvh dependency).
          On desktop: sticky in the flex flow as before. */}
      <div
        ref={inputWrapperRef}
        className="fixed bottom-0 left-0 right-0 z-[9999999] md:static md:left-auto md:right-auto md:z-auto"
      >
        <MessageInput className="px-6 py-4" />
      </div>
    </div>
  )
}

export default Messages;