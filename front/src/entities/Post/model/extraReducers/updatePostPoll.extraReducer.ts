import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { answerPollThunk } from '../../../Poll';
import type { PostsState, PostWithAttachmentsUI } from '../types/posts.type.ts';

const pollPostBackup = new Map<string, string[]>();

export const updatePostPollExtraReducer = (builder: ActionReducerMapBuilder<PostsState>) => {
  builder
    .addCase(answerPollThunk.pending, (state, action) => {
      const { parentId, parentType, answerIds, pollId } = action.meta.arg;
      if (parentType !== 'post') return;
      const post = state.entities[parentId] as PostWithAttachmentsUI;
      if (!post?.poll) return;
      if (post.poll.userVote) pollPostBackup.set(pollId, post.poll.userVote);
      post.poll.userVote = answerIds;
    })
    .addCase(answerPollThunk.fulfilled, (state, action) => {
      const { parentId, parentType, pollId } = action.meta.arg;
      if (parentType !== 'post') return;
      const post = state.entities[parentId] as PostWithAttachmentsUI;
      if (!post?.poll) return;
      pollPostBackup.delete(pollId);
      post.poll = action.payload;
    })
    .addCase(answerPollThunk.rejected, (state, action) => {
      const { parentId, parentType, pollId } = action.meta.arg;
      if (parentType !== 'post') return;
      const post = state.entities[parentId] as PostWithAttachmentsUI;
      if (!post?.poll) return;
      const backup = pollPostBackup.get(pollId);
      if (post.poll.multiple) {
        post.poll.userVote = backup || [];
      } else {
        (post.poll as { userVote: string[] | null }).userVote = backup || null;
      }
      pollPostBackup.delete(pollId);
    });
};
