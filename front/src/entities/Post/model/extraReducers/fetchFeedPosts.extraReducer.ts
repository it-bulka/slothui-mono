import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { postsAdapter } from '../adapter/postsAdapter.ts';
import { addUniqueIds } from '@/shared/libs';
import type { PostsState } from '../types/posts.type.ts';
import { fetchFeedPostsThunk } from '../thunks/fetchPosts.thunk.ts';

export const fetchFeedPostsExtraReducer = (builder: ActionReducerMapBuilder<PostsState>) => {
  builder.addCase(fetchFeedPostsThunk.fulfilled, (state, action) => {
    const { items: posts, hasMore, nextCursor } = action.payload;
    postsAdapter.addMany(state, posts);

    const feed = state.home
    feed.ids = addUniqueIds(feed.ids, posts);

    feed.hasMore = hasMore
    feed.nextCursor = nextCursor
  });
}