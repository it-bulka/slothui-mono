import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/config';

export const selectRepliesErrorByParentId = createSelector(
  [
    (state: RootState) => state.comments.replies,
    (_: RootState, parentId?: string) => parentId,
  ],
  (replies, parentId) =>
    parentId ? replies[parentId]?.error ?? null : null
)
