import { useServices } from './useServices.tsx';

export const useStoriesService = () => {
  const { stories: storiesService } = useServices();
  return storiesService;
}