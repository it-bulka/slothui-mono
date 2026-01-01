import { useServices } from './useServices.tsx';

export const useCommentsService = () => {
  const { comments: commentsService } = useServices();
  return commentsService;
}