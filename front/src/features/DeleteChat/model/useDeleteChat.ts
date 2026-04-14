import { useState, useCallback } from 'react';
import { useChatService } from '@/shared/libs/services/context';
import { useAppDispatch } from '@/shared/config/redux';
import { chatsActions } from '@/entities';

export const useDeleteChat = () => {
  const chatService = useChatService();
  const dispatch = useAppDispatch();
  const [confirmChatId, setConfirmChatId] = useState<string | null>(null);

  const requestDelete = useCallback((chatId: string) => {
    setConfirmChatId(chatId);
  }, []);

  const cancelDelete = useCallback(() => {
    setConfirmChatId(null);
  }, []);

  const confirmDelete = useCallback(async (): Promise<boolean> => {
    if (!confirmChatId) return false;
    const chatId = confirmChatId;
    setConfirmChatId(null);
    try {
      await chatService.deleteChat(chatId);
      dispatch(chatsActions.removeChat(chatId));
      return true;
    } catch (e) {
      console.error('Failed to delete chat:', e);
      return false;
    }
  }, [chatService, dispatch, confirmChatId]);

  return { confirmChatId, requestDelete, cancelDelete, confirmDelete };
};
