import { createSelector } from '@reduxjs/toolkit';
import { selectPostById } from '@/entities/Post/model/selectors/adapterSelectors.ts';
import type { RootState } from '@/app/config';

export const selectPostLikeState = createSelector(
  (state: RootState, postId: string) => selectPostById(state, postId),
  (post) => ({
    isLiked: post?.isLiked ?? false,
    likesCount: post?.likesCount ?? 0,
  })
);