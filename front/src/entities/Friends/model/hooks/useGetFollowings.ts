import { useAppDispatch } from '@/shared/config/redux';
import { fetchFollowings } from '../thunk/fetchFollowings.thunk.ts';
import { useCallback } from 'react';

export const useGetFollowings = () => {
  const dispatch = useAppDispatch();

  const getFollowings = useCallback(({ userId }: { userId: string }) => {
    return dispatch(fetchFollowings({ userId}))
  }, [dispatch]);

  return { getFollowings }
}