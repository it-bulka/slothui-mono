import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';

export const deletePostThunk = createAsyncThunk<
  void,
  string,
  ThunkAPI
>(
  'posts/delete',
  async (postId, { extra, rejectWithValue }) => {
    try {
      return await extra.services.posts.deleteOne({ id: postId });
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to delete message');
      return rejectWithValue(errMsg)
    }
  }
)