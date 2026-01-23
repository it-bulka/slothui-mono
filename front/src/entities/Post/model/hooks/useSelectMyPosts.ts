import { useAuthUserIdSelector } from '../../../AuthUser';
import { useProfilePostsSelector } from './useProfilePostsSelector.ts';

export const useSelectMyPosts = () => {
  const userId = useAuthUserIdSelector()
  return useProfilePostsSelector(userId)
}