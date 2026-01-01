import { useAppSelector } from '@/shared/config/redux';

export const useGetRepliesLoading = (parentId?: string) => useAppSelector(
  (state) => Boolean(parentId && state.comments.replies[parentId]) && state.comments.replies[parentId!].isLoading
)