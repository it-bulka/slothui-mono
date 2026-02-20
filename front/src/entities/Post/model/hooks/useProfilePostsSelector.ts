import { useAppSelector } from '@/shared/config/redux';
import { selectProfilePosts } from '../selectors/selectProfilePosts.ts';

export const useProfilePostsSelector = (userId?: string) => {
  return useAppSelector(state => selectProfilePosts(state, userId));
}