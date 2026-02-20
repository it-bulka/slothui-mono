import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';
import { selectPostEntities } from './adapterSelectors.ts';

const selectProfilePostIds = (
  state: RootState,
  userId?: string
) => state.posts.profile[userId || '']?.ids ?? [];

export const selectProfilePosts = createSelector(
  [
    selectProfilePostIds,
    selectPostEntities,
  ],
  (ids, entities) => {
    console.log('selectProfilePosts', { ids, entities })
    return ids.map(id => {
      console.log('entities[id]', entities[id])
      return entities[id]
    }).filter(Boolean);
  },
);
