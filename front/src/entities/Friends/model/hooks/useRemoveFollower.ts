import { useAppDispatch } from '@/shared/config/redux';
import { removeFollowerThunk } from '../thunk/removeFollower.thunk.ts';
import { useCallback } from 'react';

export const useRemoveFollower = () => {
  const dispatch = useAppDispatch();

  const removeFollower = useCallback((userId: string) => {
    return dispatch(removeFollowerThunk({ followerId: userId }));
  }, [dispatch]);

  return { removeFollower }
}