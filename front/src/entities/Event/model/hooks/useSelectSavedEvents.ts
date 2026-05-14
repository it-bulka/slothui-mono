import { useAppSelector } from '@/shared/config/redux';
import { selectSavedEventIds } from '../selectors/selectSavedEventIds.ts';
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';

const selectSavedEvents = createSelector(
  [selectSavedEventIds, (state: RootState) => state.events.entities],
  (ids, entities) => ids.map(id => entities[id]).filter(Boolean)
);

export const useSelectSavedEvents = () => {
  const items = useAppSelector(selectSavedEvents);
  return { items };
};
