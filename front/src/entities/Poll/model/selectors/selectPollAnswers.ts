import { createSelector } from '@reduxjs/toolkit';
import { selectPollDetails } from './selectPollDetails.ts';

export const selectPollAnswers = (pollId: string) =>
  createSelector(
    selectPollDetails(pollId),
    (poll) => poll?.answers ?? []
  )