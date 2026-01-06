import { useAppDispatch } from '@/shared/config/redux';
import { flushStoriesViewedThunk } from '../thunks/flushStoriesViewed.thunk.ts';
import { useCallback } from 'react';

export const useFlushStoriesViewed = () => {
  const dispatch = useAppDispatch();

  const flushStoriesViewed = useCallback(() => {
    dispatch(flushStoriesViewedThunk());
  }, [dispatch]);

  return {
    flushStoriesViewed
  }
}