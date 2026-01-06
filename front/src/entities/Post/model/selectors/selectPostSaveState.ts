import { createSelector } from '@reduxjs/toolkit';
import { selectPostById } from '@/entities/Post/model/selectors/adapterSelectors.ts';
import type { RootState } from '@/app/config';

export const selectPostSaveState = createSelector(
  (state: RootState, postId: string) => selectPostById(state, postId),
  (post) => ({
    isSaved: post?.isSaved ?? false,
    savedCount: post?.savedCount ?? 0,
  })
);