import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/config';

export const selectFollowersByUser = (userId?: string) =>
  createSelector(
    [
      (state: RootState) => (userId && state.friends.followersByUser[userId]) ? state.friends.followersByUser[userId].ids : [],
      (state: RootState) => state.friends.entities,
    ],
    (ids, entities) => ids.map(id => entities[id])
  )