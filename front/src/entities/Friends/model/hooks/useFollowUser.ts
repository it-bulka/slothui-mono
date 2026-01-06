import { useAppDispatch } from '@/shared/config/redux';
import { followUserThunk } from '../thunk/followUser.thunk.ts';
import { useCallback } from 'react';

export const useFollowUser = () => {
  const dispatch = useAppDispatch();

  const followUser = useCallback((userId: string) => {
    return dispatch(followUserThunk({ userId}))
  }, [dispatch]);

  return { followUser }
}