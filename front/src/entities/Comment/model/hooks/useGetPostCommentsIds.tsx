import { useAppSelector } from '@/shared/config/redux';
import { selectPostCommentsIds } from '@/entities/Comment/model/selectors/selectPostCommentsIds.ts';

export const useGetPostCommentsIds = (postId: string) => useAppSelector(
  (state) => selectPostCommentsIds(state, postId)
)