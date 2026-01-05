import { useAppDispatch } from '@/shared/config/redux';
import { flushStoriesViewedThunk } from '../thunks/flushStoriesViewed.thunk.ts';

export const useFlushStoriesViewed = () => {
  const dispatch = useAppDispatch();

  const flushStoriesViewed = () => {
    dispatch(flushStoriesViewedThunk());
  }

  return {
    flushStoriesViewed
  }
}