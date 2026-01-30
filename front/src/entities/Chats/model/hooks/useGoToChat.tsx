import { useNavigate } from 'react-router';
import { useCallback } from 'react';
import { getMessagesWithUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { chatsActions } from '@/entities';
import { useAppDispatch } from '@/shared/config/redux';

export const useGoToChat = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const goToChat = useCallback((chatId: string)=> () => {
    dispatch(chatsActions.openChat(chatId))
    navigate(getMessagesWithUserPage(chatId));
  }, [navigate, dispatch]);

  return { goToChat };
}