import { memo, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { MessageInput } from '@/widgets/MessageInput';
import { useManageActiveChatId, useCurrentChat } from './model';
import { useParams } from 'react-router';
import { useAuthUserIdSelector } from '@/entities/AuthUser';
import { CurrentChatHeader } from './ui';
import { TypingInChat } from './ui/TypingInChat/TypingInChat.tsx';
import { MessageList } from './ui/MessageList/MessageList.tsx';
import { useChatService } from '@/shared/libs/services';
import { useAppDispatch } from '@/shared/config/redux';
import { notificationsCountersActions } from '@/entities/NotificationsCounters';

const Messages = memo(() => {
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
    chatService.enterChat(chatId)
    dispatch(notificationsCountersActions.resetChatUnread({ chatId }))
  }, [chatId, chatService, dispatch])

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

  if (!authUserId || !chatId) return null;
  return (
    <main className="absolute inset-0 flex flex-col">
      <Helmet>
        <title>Messages — SlothUI</title>
        <meta name="description" content="Chat with your friends on SlothUI." />
      </Helmet>
      <CurrentChatHeader />
      <MessageList chatId={chatId} authUserId={authUserId} messages={messages} />
      <TypingInChat typing={typing} />
      <div ref={spacerRef} className="shrink-0 md:hidden" />
      <div
        ref={inputWrapperRef}
        className="fixed bottom-0 left-0 right-0 z-[9999999] md:static md:left-auto md:right-auto md:z-auto"
      >
        <MessageInput className="px-6 py-4" />
      </div>
    </main>
  )
})

Messages.displayName = 'Messages'
export default Messages
