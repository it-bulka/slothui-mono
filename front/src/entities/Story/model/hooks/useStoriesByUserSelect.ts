import { selectGroupedStoriesByUser } from '../selectors/story.selector.ts';
import { useAppSelector } from '@/shared/config/redux';

export const useGroupedStoriesByUserSelect = (userId?: string) => {
  return useAppSelector(state => selectGroupedStoriesByUser(state, userId))
}