import { useAppSelector } from '@/shared/config/redux';

export const useGetPostCommentsIds = (postId: string) => useAppSelector(
  (state) => state.comments.postComments[postId]?.ids ?? []
)