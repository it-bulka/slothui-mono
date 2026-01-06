import { useAppDispatch } from '@/shared/config/redux';
import { removeFolloweeThunk } from '../thunk/removeFolowee.thunk.ts';
import { useCallback } from 'react';

export const useRemoveFollowee = () => {
  const dispatch = useAppDispatch();

  const removeFollowee = useCallback((userId: string) => {
    return dispatch(removeFolloweeThunk({ followeeId: userId }));
  }, [dispatch]);

  return { removeFollowee }
}