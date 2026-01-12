import { useAuthUserIdSelector } from '../../../AuthUser';
import { useSelectProfilePosts } from './useSelectProfilePosts.ts';

export const useSelectMyPosts = () => {
  const userId = useAuthUserIdSelector()
  const { posts } = useSelectProfilePosts(userId)
  return { posts}
}