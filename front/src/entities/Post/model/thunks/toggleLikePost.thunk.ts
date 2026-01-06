import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';

export const toggleLikePostThunk = createAsyncThunk<
  { postId: string, liked: boolean },
  { postId: string, liked: boolean },
  ThunkAPI
>(
  'posts/togglePostLike',
  async ({ postId, liked }, { extra, rejectWithValue }) => {
    try {
      if (liked) {
        await extra.services.posts.unlikePost(postId);
      } else {
        await extra.services.posts.likePost(postId);
      }
      return { postId, liked: !liked };
    } catch {
      return rejectWithValue('Failed to toggle post like');
    }
  },
  {
    condition: ({ postId }, { getState }) => {
      const state = getState().posts.entities[postId];
      return !state?.isTogglingLike;
    }
  }
);