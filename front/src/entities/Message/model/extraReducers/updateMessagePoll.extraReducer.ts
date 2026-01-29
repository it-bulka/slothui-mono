import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { answerPollThunk } from '../../../Poll';
import type { MessagesState } from '../type/messageState.type.ts';
import type { MessageWithPollDto } from '@/shared/types';

type UserVote = string[]
const pollMessageBackup = new Map<string, UserVote>() // <pollId, answerIds[]> userVote
export const updateMessagePollExtraReducer = (builder: ActionReducerMapBuilder<MessagesState>) => {
  builder
    .addCase(answerPollThunk.pending, (state, action) => {
      // guard
      const { parentId, parentType, answerIds, pollId } = action.meta.arg;
      if(parentType !== 'message') return;

      const poll = (state.entities[parentId] as MessageWithPollDto).poll
      if(!poll) return;

      if(poll.userVote) {
        pollMessageBackup.set(pollId, poll.userVote)
      }
      // optimistic update
      poll.userVote = answerIds
    })
    .addCase(answerPollThunk.fulfilled, (state, action) => {
      // guard
      const { parentId, parentType, pollId } = action.meta.arg;
      if(parentType !== 'message') return;

      const msgWithPoll = state.entities[parentId] as MessageWithPollDto
      if(!msgWithPoll?.poll) return;

      pollMessageBackup.delete(pollId)
      // TODO: later change updating on ws
      msgWithPoll.poll = action.payload
  })
    .addCase(answerPollThunk.rejected, (state, action) => {
      // guard
      const { parentId, parentType, pollId } = action.meta.arg;
      if(parentType !== 'message') return;

      const poll = (state.entities[parentId] as MessageWithPollDto).poll
      if(!poll) return;

      // rollback
      const userVoteBackup = pollMessageBackup.get(pollId)
      if(poll.multiple) {
        poll.userVote = userVoteBackup || []
      } else {
        poll.userVote = userVoteBackup || null
      }

      pollMessageBackup.delete(pollId)
    });
}