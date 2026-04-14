import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';

export const toggleLikePostThunk = createAsyncThunk<
  { postId: string; liked: boolean; likesCount: number },
  { postId: string, liked: boolean },
  ThunkAPI
>(
  'posts/togglePostLike',
  async ({ postId, liked }, { extra, rejectWithValue }) => {
    try {
      const res = liked
        ? await extra.services.posts.unlikePost(postId)
        : await extra.services.posts.likePost(postId);
      return { postId, liked: !liked, likesCount: res.likeCounts };
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