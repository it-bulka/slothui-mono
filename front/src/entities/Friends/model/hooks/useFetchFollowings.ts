import { useAppDispatch } from '@/shared/config/redux';
import { useCallback } from 'react';
import { fetchFollowings as fetchFollowingsThunk } from '../thunk/fetchFollowings.thunk.ts';

export const useFetchFollowings = () => {
  const dispatch = useAppDispatch();

  const fetchFollowings = useCallback((arg: { cursor?: string, userId: string}) => {
    dispatch(fetchFollowingsThunk(arg))
  }, [dispatch]);

  return { fetchFollowings}
}