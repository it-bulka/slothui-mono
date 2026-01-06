import { useAppDispatch } from '@/shared/config/redux';
import { fetchFollowers } from '../thunk/fetchFollowers.thunk.ts';
import { useCallback } from 'react';

export const useGetFollowers = () => {
  const dispatch = useAppDispatch();

  const getUserFollowers = useCallback(({ userId }: { userId: string }) => {
    return dispatch(fetchFollowers({ userId}))
  }, [dispatch]);

  return { getUserFollowers }
}