import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';

export const selectPostCommentsAmount = createSelector(
  [
    (state: RootState) => state.comments.postComments,
    (_: RootState, postId: string) => postId,
  ],
  (postComments, postId) =>
    postComments[postId]?.ids.length ?? 0
)