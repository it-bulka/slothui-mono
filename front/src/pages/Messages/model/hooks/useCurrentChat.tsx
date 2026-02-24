import { useMessagesService, useChatService } from '@/shared/libs/services';
import { useAppDispatch } from '@/shared/config/redux';
import { useEffect, useState } from 'react';
import { useActiveChatId, useMessagesByChatSelect } from '@/entities';

export const useCurrentChat = () => {
  const messagesService = useMessagesService()
  const chatService = useChatService()
  const dispatch = useAppDispatch()
  const [typing, setTyping] = useState<{ userName: string } | null>(null);
  const activeChatId = useActiveChatId()
  const messages = useMessagesByChatSelect(activeChatId)

  useEffect(() => {
    if(!activeChatId) return

    chatService.joinChat(activeChatId)
    messagesService.onTyping(activeChatId).subscribe(({isTyping, user }) => {
      if(isTyping) {
        setTyping({ userName: user });
      } else {
        setTyping(null)
      }
    });

    return () => {
      chatService.leaveChat(activeChatId)
    }
  }, [messagesService, chatService, dispatch, setTyping, activeChatId]);


  return { typing, messages }
}