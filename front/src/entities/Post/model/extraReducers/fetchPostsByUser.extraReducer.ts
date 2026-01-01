import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { fetchPostsByUserThunk } from '../thunks/fetchPostsByUser.thunk.ts';
import { postsAdapter } from '../adapter/postsAdapter.ts';
import { addUniqueIds } from '../utils/addIniqueIds.ts';
import type { PostsState } from '../types/posts.type.ts';

export const fetchPostsByUserExtraReducer = (builder: ActionReducerMapBuilder<PostsState>) => {
  builder.addCase(fetchPostsByUserThunk.fulfilled, (state, action) => {
    const { userId } = action.meta.arg;
    const { items: posts, hasMore, nextCursor } = action.payload;

    postsAdapter.upsertMany(state, posts);

    state.profile[userId] ??= { ids: [], isLoading: false, hasMore: true, nextCursor: null };
    addUniqueIds(state.profile[userId].ids, posts);

    state.profile[userId].hasMore = hasMore;
    state.profile[userId].nextCursor = nextCursor;
  });
}