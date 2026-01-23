import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { postsAdapter } from '../adapter/postsAdapter.ts';
import { addUniqueIds } from '@/shared/libs';
import type { PostsState } from '../types/posts.type.ts';
import { fetchMyPostsThunk } from '../thunks/fetchMyPosts.thunk.ts';

export const fetchMyPostsExtraReducer = (builder: ActionReducerMapBuilder<PostsState>) => {
  builder.addCase(fetchMyPostsThunk.fulfilled, (state, action) => {
    const { items: posts, hasMore, nextCursor } = action.payload;
    if(!posts?.length) return

    postsAdapter.addMany(state, posts);

    const currentUserId = posts[0].author.id;

    state.profile[currentUserId] ??= {
      ids: [],
      isLoading: false,
      hasMore: true,
      nextCursor: null
    }

    const feed = state.profile[currentUserId]
    feed.ids = addUniqueIds(feed.ids, posts);

    feed.hasMore = hasMore
    feed.nextCursor = nextCursor
  });
}