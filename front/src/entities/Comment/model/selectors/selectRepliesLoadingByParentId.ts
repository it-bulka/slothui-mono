import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/config';

export const selectRepliesLoadingByParentId = createSelector(
  [
    (state: RootState) => state.comments.replies,
    (_: RootState, parentId?: string) => parentId,
  ],
  (replies, parentId) =>
    parentId ? Boolean(replies[parentId]?.isLoading) : false
)
