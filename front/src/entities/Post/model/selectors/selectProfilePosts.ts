import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';

const selectProfilePostIds = (
  state: RootState,
  userId: string
) => state.posts.profile[userId]?.ids ?? [];

export const selectProfilePosts = createSelector(
  [
    selectProfilePostIds,
    (state: RootState) => state.posts.entities,
  ],
  (ids, entities) => ids.map(id => entities[id]!)
);
