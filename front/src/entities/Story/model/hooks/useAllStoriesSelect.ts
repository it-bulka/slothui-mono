import { useAppSelector } from '@/shared/config/redux';
import { selectAllGroupedStories, selectGroupedStoriesExcluding } from '../selectors/story.selector.ts';

export const useAllGroupedStoriesSelect = () => {
  return useAppSelector(selectAllGroupedStories);
}

export const useGroupedStoriesExcludingUser = (excludeUserId?: string) => {
  return useAppSelector(state => selectGroupedStoriesExcluding(state, excludeUserId));
}