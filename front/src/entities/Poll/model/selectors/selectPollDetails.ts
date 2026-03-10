import { createSelector } from '@reduxjs/toolkit';
import { pollDetailsSelectors } from '../slice/pollDetails.adapter.ts';

export const selectPollDetails = (pollId: string) =>
  createSelector(
    pollDetailsSelectors.selectEntities,
    (entities) => entities[pollId]
  )