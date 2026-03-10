import { createSelector } from '@reduxjs/toolkit';
import { selectPollDetails } from './selectPollDetails.ts';

export const selectAnswerVoters = (
  pollId: string,
  answerId: string
) =>
  createSelector(
    selectPollDetails(pollId),
    (poll) =>
      poll?.answers.find((a) => a.id === answerId)?.voters
  )