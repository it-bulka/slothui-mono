import { useEffect } from 'react';
import { useSetActiveChatId } from '@/entities';

export const useManageActiveChatId = (chatId?: string) => {
  const { setActiveChatId }  = useSetActiveChatId()

  useEffect(() => {
    if(!chatId) return
    setActiveChatId(chatId)

    return () => setActiveChatId(null)
  }, [setActiveChatId, chatId])
}