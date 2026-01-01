import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { PostWithAttachmentsDto } from '@/shared/types';

export const createPostThunk = createAsyncThunk<
  PostWithAttachmentsDto,
  string,
  ThunkAPI
>(
  'posts/create',
  async (postId, { extra, rejectWithValue }) => {
    try {
      return await extra.services.posts.getOne({ id: postId });
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to create message');
      return rejectWithValue(errMsg)
    }
  }
)