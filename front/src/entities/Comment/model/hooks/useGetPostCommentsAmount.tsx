import { useAppSelector } from '@/shared/config/redux';
import { selectPostCommentsAmount } from '@/entities/Comment/model/selectors/selectPostCommentAmount.ts';

export const useGetPostCommentsAmount = (postId: string) => useAppSelector(
  (state) => selectPostCommentsAmount(state, postId),
)