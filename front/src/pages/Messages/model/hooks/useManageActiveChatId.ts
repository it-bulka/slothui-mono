import { useEffect } from 'react';
import { useSetActiveChatId, useFetchMyChats, useActiveChatDataSelector } from '@/entities';

export const useManageActiveChatId = (chatId?: string) => {
  const { setActiveChatId }  = useSetActiveChatId()
  const { fetchMyChats } = useFetchMyChats()
  const chat = useActiveChatDataSelector()

  useEffect(() => {
    if(!chatId) return
    setActiveChatId(chatId)

    return () => setActiveChatId(null)
  }, [setActiveChatId, chatId])

  useEffect(() => {
    if (chatId && !chat) {
      fetchMyChats()
    }
  }, [chatId, chat, fetchMyChats])
}