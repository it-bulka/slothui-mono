import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { postsAdapter } from '../adapter/postsAdapter.ts';
import type { PostsState } from '../types/posts.type.ts';
import { deletePostThunk } from '../thunks/deletePost.thunk.ts';

export const deletePostExtraReducer = (builder: ActionReducerMapBuilder<PostsState>) => {
  builder.addCase(deletePostThunk.fulfilled, (state, action) => {
    const postId = action.meta.arg; // у RTK thunk аргументи через meta.arg
    postsAdapter.removeOne(state, postId);

    // delete from home
    state.home.ids = state.home.ids.filter(id => id !== postId);

    // delete from saves
    state.saves.ids = state.saves.ids.filter(id => id !== postId);

    // delete from likes
    state.likes.ids = state.likes.ids.filter(id => id !== postId);

    // delete from profile
    for (const userId in state.profile) {
      state.profile[userId].ids = state.profile[userId].ids.filter(id => id !== postId);
    }
  });
}