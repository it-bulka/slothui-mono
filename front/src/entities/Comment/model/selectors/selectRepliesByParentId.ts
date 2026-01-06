import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/config';

export const selectRepliesByParentId = createSelector(
  [
    (state: RootState) => state.comments.replies,
    (_: RootState, parentId?: string) => parentId,
  ],
  (replies, parentId) =>
    parentId ? replies[parentId] ?? null : null
)
