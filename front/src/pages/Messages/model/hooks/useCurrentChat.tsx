import { useMessagesService, useChatService } from '@/shared/libs/services';
import { useAppDispatch } from '@/shared/config/redux';
import { useEffect, useState } from 'react';
import { useActiveChatId, useMessagesByChatSelect, useActiveChatDataSelector } from '@/entities';

export const useCurrentChat = () => {
  const messagesService = useMessagesService()
  const chatService = useChatService()
  const dispatch = useAppDispatch()
  const [typing, setTyping] = useState<{ userName: string } | null>(null);
  const activeChatId = useActiveChatId()
  const activeChat = useActiveChatDataSelector()
  const messages = useMessagesByChatSelect(activeChatId)

  useEffect(() => {
    if(!activeChatId) return

    chatService.joinChat(activeChatId)
    const subscription = messagesService.onTyping(activeChatId).subscribe(({isTyping, user }) => {
      if(isTyping) {
        const displayName = activeChat?.anotherMember?.nickname
          || activeChat?.anotherMember?.username
          || user.id;
        setTyping({ userName: displayName });
      } else {
        setTyping(null)
      }
    });

    return () => {
      chatService.leaveChat(activeChatId)
      subscription.unsubscribe()
    }
  }, [messagesService, chatService, dispatch, setTyping, activeChatId, activeChat]);


  return { typing, messages }
}