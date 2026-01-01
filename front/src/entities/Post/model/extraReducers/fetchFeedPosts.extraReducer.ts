import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { postsAdapter } from '../adapter/postsAdapter.ts';
import { addUniqueIds } from '../utils/addIniqueIds.ts';
import type { PostsState } from '../types/posts.type.ts';
import { fetchFeedPostsThunk } from '../thunks/fetchPosts.thunk.ts';

export const fetchFeedPostsExtraReducer = (builder: ActionReducerMapBuilder<PostsState>) => {
  builder.addCase(fetchFeedPostsThunk.fulfilled, (state, action) => {
    const { items: posts, hasMore, nextCursor } = action.payload;
    postsAdapter.addMany(state, posts);

    const feed = state.home
    addUniqueIds(feed.ids, posts);

    feed.hasMore = hasMore
    feed.nextCursor = nextCursor
  });
}