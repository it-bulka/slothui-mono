import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { postsAdapter } from '../adapter/postsAdapter.ts';
import { addUniqueIds } from '@/shared/libs';
import type { PostsState } from '../types/posts.type.ts';
import { fetchMyPostsThunk } from '../thunks/fetchMyPosts.thunk.ts';

export const fetchMyPostsExtraReducer = (builder: ActionReducerMapBuilder<PostsState>) => {
  builder
    .addCase(fetchMyPostsThunk.pending, (state, action) => {
      const currentUserId = action.meta.arg.currentUserId;
      state.profile[currentUserId] ??= {
        ids: [],
        isLoading: true,
        hasMore: true,
        nextCursor: null
      }

      state.profile[currentUserId].isLoading = true
    })
    .addCase(fetchMyPostsThunk.fulfilled, (state, action) => {
      const { items: posts, hasMore, nextCursor } = action.payload;
      if(!posts?.length) return

      postsAdapter.addMany(state, posts);

      const currentUserId = posts[0].author.id;
      const feed = state.profile[currentUserId]

      state.profile[currentUserId].ids = addUniqueIds(feed.ids, posts)
      state.profile[currentUserId].isLoading = false
      state.profile[currentUserId].hasMore = hasMore
      state.profile[currentUserId].nextCursor = nextCursor
    })
    .addCase(fetchMyPostsThunk.rejected, (state, action) => {
      const currentUserId = action.meta.arg.currentUserId;

      state.profile[currentUserId].isLoading = false
      state.profile[currentUserId].error = action.payload
    })
}