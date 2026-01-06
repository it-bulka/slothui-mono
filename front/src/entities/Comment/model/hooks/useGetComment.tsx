import { useAppSelector } from '@/shared/config/redux';
import { selectCommentById } from '@/entities/Comment/model/selectors/selectCommentById.ts';

export const useGetComment = (commentId: string) => useAppSelector(
  (state) => selectCommentById(state, commentId),
)