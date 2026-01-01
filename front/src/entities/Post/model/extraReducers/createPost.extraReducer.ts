import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { postsAdapter } from '../adapter/postsAdapter.ts';
import type { PostsState } from '../types/posts.type.ts';
import { createPostThunk } from '../thunks/createPost.thunk.ts';

export const createPostExtraReducer = (builder: ActionReducerMapBuilder<PostsState>) => {
  builder.addCase(createPostThunk.fulfilled, (state, action) => {
    postsAdapter.addOne(state, action.payload);
    state.home.ids.push(action.payload.id);
  });
}