import { useUserIdSelector } from '../../../User';
import { useSelectProfilePosts } from './useSelectProfilePosts.ts';

export const useSelectMyPosts = () => {
  const userId = useUserIdSelector()
  const { posts } = useSelectProfilePosts(userId)
  return { posts}
}