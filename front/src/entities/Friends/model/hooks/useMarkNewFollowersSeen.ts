import { useAppDispatch } from '@/shared/config/redux';
import { useCallback } from 'react';
import { markNewFollowersSeenThunk } from '../thunk/markNewFollowersSeen.thunk.ts';

export const useMarkNewFollowersSeen = () => {
  const dispatch = useAppDispatch();
  const markSeen = useCallback(() => {
    dispatch(markNewFollowersSeenThunk());
  }, [dispatch]);
  return { markSeen };
}