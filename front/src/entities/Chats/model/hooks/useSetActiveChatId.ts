import { useAppDispatch } from '@/shared/config/redux';
import { useCallback } from 'react';
import { chatsActions } from '../slice.ts';

export const useSetActiveChatId = () => {
  const dispatch = useAppDispatch();

  const setActiveChatId = useCallback((chatId: string | null) => {
    dispatch(chatsActions.setActiveChatId(chatId));
  }, [dispatch]);

  return { setActiveChatId }
}