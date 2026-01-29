import { useAppDispatch } from '@/shared/config/redux';
import { useCallback } from 'react';
import { fetchMyChatsThunk } from '../thunk/fetchMyChats.thunk.ts';

export const useFetchMyChats = () => {
  const dispatch = useAppDispatch();

  const fetchMyChats = useCallback((arg: { cursor?: string | null} = {}) => {
    dispatch(fetchMyChatsThunk(arg))
  }, [dispatch]);

  return { fetchMyChats }
}