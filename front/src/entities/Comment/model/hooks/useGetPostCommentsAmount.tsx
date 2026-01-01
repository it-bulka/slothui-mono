import { useAppSelector } from '@/shared/config/redux';

export const useGetPostCommentsAmount = (postId: string) => useAppSelector(
  (state) => state.comments.postComments[postId]?.ids.length ?? 0
)