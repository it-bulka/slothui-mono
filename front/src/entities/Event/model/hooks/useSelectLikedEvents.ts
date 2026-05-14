import { useAppSelector } from '@/shared/config/redux';
import { selectLikedEventIds } from '../selectors/selectLikedEventIds.ts';
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';

const selectLikedEvents = createSelector(
  [selectLikedEventIds, (state: RootState) => state.events.entities],
  (ids, entities) => ids.map(id => entities[id]).filter(Boolean)
);

export const useSelectLikedEvents = () => {
  const items = useAppSelector(selectLikedEvents);
  return { items };
};
