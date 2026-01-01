import type { RootState } from '@/app/config';

export const selectPostComments = (postId: string) => (state: RootState) =>
  state.comments.postComments[postId]

export const selectReplies = (parentId: string) => (state: RootState) =>
  state.comments.replies[parentId]