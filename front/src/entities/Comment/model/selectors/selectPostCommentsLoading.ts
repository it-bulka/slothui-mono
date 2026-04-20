import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/config';

export const selectPostCommentsLoading = createSelector(
  [
    (state: RootState) => state.comments.postComments,
    (_: RootState, postId: string) => postId,
  ],
  (postComments, postId) => Boolean(postComments[postId]?.isLoading)
)

export const selectPostCommentsInitialized = createSelector(
  [
    (state: RootState) => state.comments.postComments,
    (_: RootState, postId: string) => postId,
  ],
  (postComments, postId) => postId in postComments
)
