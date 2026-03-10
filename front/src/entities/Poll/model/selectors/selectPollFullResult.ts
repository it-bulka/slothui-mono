import { createSelector } from '@reduxjs/toolkit';
import { selectPollDetails } from './selectPollDetails.ts';

export const selectPollFullResult = (pollId: string) =>
  createSelector(
    selectPollDetails(pollId),
    (poll) => {
      if (!poll) return null

      return {
        pollId: poll.id,
        anonymous: false,
        options: poll.answers.map((answer) => ({
          id: answer.id,
          value: answer.value,
          percentage: answer.percentage,
          votes: answer.votes,
          voters: answer.voters.items,
          hasMore: answer.voters.hasMore,
        })),
      }
    }
  )