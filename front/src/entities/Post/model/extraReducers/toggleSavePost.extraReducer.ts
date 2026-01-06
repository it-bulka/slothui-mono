import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { PostsState } from '../types/posts.type.ts';
import { toggleSavePostThunk } from '../thunks/toggleSavePost.thunk.ts';

export const toggleSavePostExtraReducer = (builder: ActionReducerMapBuilder<PostsState>) => {
  builder
    .addCase(toggleSavePostThunk.pending, (state, action) => {
      const post = state.entities[action.meta.arg.postId];
      if (post) {
        post.isSaved = !post.isSaved;
        post.savedCount += post.isSaved ? 1 : -1;

        post.isTogglingSave = true
      }
    })
    .addCase(toggleSavePostThunk.fulfilled, (state, action) => {
      const post = state.entities[action.meta.arg.postId];
      if (post) {
        state.saves.ids.push(post.id);
        post.isTogglingSave = false
      }
    })
    .addCase(toggleSavePostThunk.rejected, (state, action) => {
      const post = state.entities[action.meta.arg.postId];
      if (post) {
        post.isSaved = action.meta.arg.saved;
        post.savedCount += post.isSaved ? 1 : -1;

        post.isTogglingSave = false
      }
    })
}