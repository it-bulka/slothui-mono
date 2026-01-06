import { useAppDispatch } from '@/shared/config/redux';
import { storiesActions } from '../slice/story.slice.ts';
import { useCallback } from 'react';

export const useMarkStoriesViewedLocally = () => {
  const dispatch = useAppDispatch();

  const markStoryViewedLocally = useCallback((storyId?: string) => {
    if (!storyId) return;
    dispatch(storiesActions.markStoryViewedLocally(storyId));
  }, [dispatch]);

  return { markStoryViewedLocally }
}