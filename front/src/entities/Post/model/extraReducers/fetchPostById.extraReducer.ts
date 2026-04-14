import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { postsAdapter } from '../adapter/postsAdapter.ts';
import type { PostsState } from '../types/posts.type.ts';
import { fetchPostByIdThunk } from '../thunks/fetchPostById.thunk.ts';

export const fetchPostByIdExtraReducer = (builder: ActionReducerMapBuilder<PostsState>) => {
  builder.addCase(fetchPostByIdThunk.fulfilled, (state, action) => {
    postsAdapter.upsertOne(state, action.payload);
  });
};
