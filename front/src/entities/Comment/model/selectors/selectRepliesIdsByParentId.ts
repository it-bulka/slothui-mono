import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/config';

const EMPTY_ARRAY: string[] = []

export const selectRepliesIdsByParentId = createSelector(
  [
    (state: RootState) => state.comments.replies,
    (_: RootState, parentId?: string) => parentId,
  ],
  (replies, parentId) =>
    parentId && replies[parentId]
      ? replies[parentId].ids
      : EMPTY_ARRAY
)
