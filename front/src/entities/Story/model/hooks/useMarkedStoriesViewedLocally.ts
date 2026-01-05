import { useAppDispatch } from '@/shared/config/redux';
import { storiesActions } from '../slice/story.slice.ts';

export const useMarkStoriesViewedLocally = () => {
  const dispatch = useAppDispatch();

  const markStoryViewedLocally = (storyId?: string) => {
    if (!storyId) return;
    dispatch(storiesActions.markStoryViewedLocally(storyId));
  }

  return { markStoryViewedLocally }
}