import { useAppSelector } from '@/shared/config/redux';

export const useGetComment = (commentId: string) => useAppSelector(
  (state) => state.comments.entities[commentId]
)