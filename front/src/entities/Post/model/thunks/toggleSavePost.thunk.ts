import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';

export const toggleSavePostThunk = createAsyncThunk<
  { postId: string, saved: boolean },
  { postId: string, saved: boolean },
  ThunkAPI
>(
  'posts/togglePostSave',
  async ({ postId, saved }, { extra, rejectWithValue }) => {
    try {
      if (saved) {
        await extra.services.posts.unsavePost(postId);
      } else {
        await extra.services.posts.savePost(postId);
      }
      return { postId, saved: !saved };
    } catch {
      return rejectWithValue('Failed to toggle post saving');
    }
  },
  {
    condition: ({ postId }, { getState }) => {
      const state = getState().posts.entities[postId];
      return !state?.isTogglingSave;
    }
  }
);