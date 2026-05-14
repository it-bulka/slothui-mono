import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';
import { selectPostEntities } from './adapterSelectors.ts';

const EMPTY_IDS: string[] = [];

const selectProfilePostIds = (
  state: RootState,
  userId?: string
) => state.posts.profile[userId || '']?.ids ?? EMPTY_IDS;

export const selectProfilePosts = createSelector(
  [
    selectProfilePostIds,
    selectPostEntities,
  ],
  (ids, entities) => {
    return ids.map(id => entities[id]).filter(Boolean);
  },
);
