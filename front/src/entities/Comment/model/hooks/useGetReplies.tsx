import { useAppSelector } from '@/shared/config/redux';

export const useGetReplies = (parentId?: string) => useAppSelector(
  (state) => parentId ? state.comments.replies[parentId] : null,
)

export const useGetRepliesIds = (parentId?: string) => useAppSelector(
  (state) => (parentId && state.comments.replies[parentId]) ? state.comments.replies[parentId]?.ids : []
)