import { useAppDispatch } from '@/shared/config/redux';
import { fetchEventsByUserThunk } from '../thunk/fetchEventsByUser.thunk.ts';
import { useCallback } from 'react';

export const useFetchEventsByUser = () => {
  const dispatch = useAppDispatch();

  const fetchEventsByUser = useCallback((arg: { userId: string; cursor?: string | null }) => {
    dispatch(fetchEventsByUserThunk({ userId: arg.userId, cursor: arg.cursor }))
  }, [dispatch]);


  return { fetchEventsByUser };
}