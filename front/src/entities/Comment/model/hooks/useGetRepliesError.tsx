import { useAppSelector } from '@/shared/config/redux';

export const useGetRepliesError = (parentId?: string) => useAppSelector(
  (state) => (parentId && state.comments.replies[parentId]) && state.comments.replies[parentId!].error
)