import { useServices } from './useServices.tsx';

export const usePostsService = () => {
  const { posts: postsService } = useServices();
  return postsService;
}