import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { PollDetailsState } from '../type/pollDetails.state.ts';
import { fetchPollVotersThunk } from '../thunk';

export const fetchPollVotersExtraReducer = (builder: ActionReducerMapBuilder<PollDetailsState>) => {
  builder
    .addCase(fetchPollVotersThunk.pending, (state, action) => {
      const { pollId, answerId } = action.meta.arg

      const poll = state.entities[pollId]
      if (!poll) return

      const answer = poll.answers.find(a => a.id === answerId)
      if (!answer) return

      answer.voters.loading = true
      answer.voters.error = undefined
    })

    .addCase(fetchPollVotersThunk.fulfilled, (state, action) => {
      const { pollId, answerId } = action.meta.arg
      const { items, nextCursor, hasMore } = action.payload

      const poll = state.entities[pollId]
      if (!poll) return

      const answer = poll.answers.find(a => a.id === answerId)
      if (!answer) return

      answer.voters.items.push(...items)
      answer.voters.cursor = nextCursor
      answer.voters.hasMore = hasMore
      answer.voters.loading = false
    })
};