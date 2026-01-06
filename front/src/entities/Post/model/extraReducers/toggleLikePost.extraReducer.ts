import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { PostsState } from '../types/posts.type.ts';
import { toggleLikePostThunk } from '../thunks/toggleLikePost.thunk.ts';

export const toggleLikePostExtraReducer = (builder: ActionReducerMapBuilder<PostsState>) => {
  builder
    .addCase(toggleLikePostThunk.pending, (state, action) => {
      const post = state.entities[action.meta.arg.postId];
      if (post) {
        post.isLiked = !post.isLiked;
        post.likesCount += post.isLiked ? 1 : -1;

        post.isTogglingLike = true
      }
    })
    .addCase(toggleLikePostThunk.fulfilled, (state, action) => {
      const post = state.entities[action.meta.arg.postId];
      if (post) {
        state.likes.ids.push(post.id);

        post.isTogglingLike = false
      }
    })
    .addCase(toggleLikePostThunk.rejected, (state, action) => {
      const post = state.entities[action.meta.arg.postId];
      if (post) {
        post.isLiked = action.meta.arg.liked;
        post.likesCount += post.isLiked ? 1 : -1;

        post.isTogglingLike = false
      }
    })
}