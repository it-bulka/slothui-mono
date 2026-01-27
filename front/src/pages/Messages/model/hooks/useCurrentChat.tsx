import { useMessagesService } from '@/shared/libs/services';
import { useAppDispatch } from '@/shared/config/redux';
import { useEffect, useState } from 'react';
import { messagesAction, useActiveChatId, useMessagesByChatSelect } from '@/entities';

export const useCurrentChat = () => {
  const messagesService = useMessagesService()
  const dispatch = useAppDispatch()
  const [typing, setTyping] = useState<{ userName: string } | null>(null);
  const activeChatId = useActiveChatId()
  const messages = useMessagesByChatSelect(activeChatId)

  useEffect(() => {
    messagesService.onMessage(activeChatId).subscribe((msg) => {
      dispatch(messagesAction.messageReceived(msg));
    });
    messagesService.onTyping(activeChatId).subscribe(({isTyping, user }) => {
      if(isTyping) {
        setTyping({ userName: user });
      } else {
        setTyping(null)
      }
    });
  }, [messagesService, dispatch, setTyping, activeChatId]);


  return { typing, messages }
}