import { useCallback, useEffect } from 'react';
import { useChatMetaSelect, useFetchMessagesByChat } from '@/entities';

export const useLoadMessages = ({ chatId, isMessages }: { chatId: string, isMessages: boolean }) => {
  const { fetchMessagesByChat } = useFetchMessagesByChat()
  const { loading, cursor, hasMore } = useChatMetaSelect(chatId)

  const onLoadMore = useCallback(() => {
    if (!chatId) return
    fetchMessagesByChat({ cursor, chatId })
  }, [chatId, fetchMessagesByChat, cursor])


  useEffect(() => {
    // init
    if (!isMessages && hasMore && !loading) {
      onLoadMore()
    }
  }, [isMessages, hasMore, loading, onLoadMore])

  return { onLoadMore }
}