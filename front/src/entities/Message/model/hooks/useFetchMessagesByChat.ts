import { useCallback } from 'react';
import { useAppDispatch } from '@/shared/config/redux';
import { fetchMessagesByChatThunk } from '../thunk/fetchMessagesByChat.tsx';

export const useFetchMessagesByChat = () => {
  const dispatch = useAppDispatch();

  const fetchMessagesByChat = useCallback((arg: { chatId: string, cursor?: string | null}) => {
    dispatch(fetchMessagesByChatThunk(arg))
  }, [dispatch]);

  return { fetchMessagesByChat}
}