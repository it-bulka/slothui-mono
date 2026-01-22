import { ActionButton } from '@/shared/ui';
import MessageIcon from '@/shared/assets/images/sidebar/message.svg?react';
import { useChatService } from '@/shared/libs/services';
import { useNavigate } from 'react-router';
import { useCallback } from 'react';
import { toast } from 'react-toastify'
import { getMessagesWithUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { memo } from 'react';

export const OpenChatWithUserButton = memo(({ userId }: { userId: string}) => {
  const chatService = useChatService();
  const navigate = useNavigate();

  const handleOpenChat = useCallback(async () => {
    try {
      const data  = await chatService.findChatByMember(userId);
      if (data.chatId) {
        navigate(getMessagesWithUserPage(data.chatId));
        return
      }
      toast.warn('Failed to open a chat');
    } catch {
      toast.warn('Failed to open a chat');
    }
  }, [navigate, chatService, userId]);

  return (
    <ActionButton Icon={MessageIcon} onClick={handleOpenChat}>
      open chat
    </ActionButton>
  )
})

OpenChatWithUserButton.displayName = 'OpenChatWithUserButton';