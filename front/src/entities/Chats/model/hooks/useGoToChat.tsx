import { useNavigate } from 'react-router';
import { useCallback } from 'react';
import { getMessagesWithUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';

export const useGoToChat = () => {
  const navigate = useNavigate();

  const goToChat = useCallback((chatId: string)=> () => {
    navigate(getMessagesWithUserPage(chatId));
  }, [navigate]);

  return { goToChat };
}