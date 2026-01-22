import { useAppDispatch } from '@/shared/config/redux';
import { unfollowThunk } from '../thunk/unfollow.thunk.ts';
import { useCallback } from 'react';

export const useUnfollow = () => {
  const dispatch = useAppDispatch();

  const unfollow = useCallback((userId: string) => {
    return dispatch(unfollowThunk({ followeeId: userId }));
  }, [dispatch]);

  return { unfollow }
}