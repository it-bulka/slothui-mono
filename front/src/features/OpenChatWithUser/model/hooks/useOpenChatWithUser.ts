import { useCallback } from 'react';
import { useChatService } from '@/shared/libs/services';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { getMessagesWithUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { chatsActions } from '@/entities/Chats';
import { useAppDispatch } from '@/shared/config/redux';

export const useOpenChatWithUser = (userId: string) => {
  const chatService = useChatService();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOpenChat = useCallback(async () => {
    try {
      const data = await chatService.findChatByMember(userId);
      if (data.id) {
        dispatch(chatsActions.addChat(data));
        dispatch(chatsActions.setActiveChatId(data.id));
        navigate(getMessagesWithUserPage(data.id));
        return;
      }
      toast.warn('Failed to open a chat');
    } catch {
      toast.warn('Failed to open a chat');
    }
  }, [navigate, chatService, userId, dispatch]);

  return { handleOpenChat };
};
