import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/config';

export const selectFollowingsByUser = createSelector(
    [
      (state: RootState, userId?: string) => (userId && state.friends.followingsByUser[userId]) ? state.friends.followingsByUser[userId].ids : [],
      (state: RootState) => state.friends.entities,
    ],
    (ids, entities) => ids.map(id => entities[id])
  )