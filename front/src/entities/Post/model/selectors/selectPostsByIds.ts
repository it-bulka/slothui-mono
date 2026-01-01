import type { RootState } from '@/app/config';
import { createSelector } from '@reduxjs/toolkit';
import { selectPostEntities } from './adapterSelectors.ts';

export const selectPostsByIds = createSelector(
  [
    (_: RootState, ids: string[]) => ids,
    selectPostEntities,
  ],
  (ids, entities) => ids.map(id => entities[id]!)
)