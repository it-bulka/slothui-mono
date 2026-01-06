import { useAppSelector } from '@/shared/config/redux';
import { selectAllGroupedStories } from '../selectors/story.selector.ts';

export const useAllGroupedStoriesSelect = () => {
  return useAppSelector(selectAllGroupedStories);
}