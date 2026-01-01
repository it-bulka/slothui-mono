import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { postsAdapter } from '../adapter/postsAdapter.ts';
import { addUniqueIds } from '../utils/addIniqueIds.ts';
import type { PostsState } from '../types/posts.type.ts';
import { fetchLikedPostsThunk } from '@/entities/Post/model/thunks/fetchLikedPosts.thunk.ts';

export const fetchLikedPostsExtraReducer = (builder: ActionReducerMapBuilder<PostsState>) => {
  builder.addCase(fetchLikedPostsThunk.fulfilled, (state, action) => {
    const { items: posts, hasMore, nextCursor } = action.payload;
    postsAdapter.addMany(state, posts);

    const liked = state.likes
    addUniqueIds(liked.ids, posts)

    liked.hasMore = hasMore
    liked.nextCursor = nextCursor
  });
}