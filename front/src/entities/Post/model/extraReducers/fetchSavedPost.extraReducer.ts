import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { postsAdapter } from '../adapter/postsAdapter.ts';
import { addUniqueIds } from '../utils/addIniqueIds.ts';
import type { PostsState } from '../types/posts.type.ts';
import { fetchSavedPostsThunk } from '../thunks/fetchSavedPosts.thunk.ts';

export const fetchSavedPostsExtraReducer = (builder: ActionReducerMapBuilder<PostsState>) => {
  builder.addCase(fetchSavedPostsThunk.fulfilled, (state, action) => {
    const { items: posts, hasMore, nextCursor } = action.payload;
    postsAdapter.addMany(state, posts);

    const saves = state.saves
    addUniqueIds(saves.ids, posts);

    saves.hasMore = hasMore
    saves.nextCursor = nextCursor
  });
}