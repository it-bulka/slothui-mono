import { useAppSelector } from '@/shared/config/redux';
import { selectProfilePosts } from '../selectors/selectProfilePosts.ts';

export const useProfilePostsSelector = (userId?: string) => {
  console.log('useProfilePostsSelector', userId)
  return useAppSelector(state =>
    userId ? selectProfilePosts(state, userId) : []
  );
}