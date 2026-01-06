import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';

export const selectCommentById = createSelector(
    (_: RootState, commentId: string) => commentId,
    (state: RootState) => state.comments.entities,
    (commentId, entities) => entities[commentId]
  )