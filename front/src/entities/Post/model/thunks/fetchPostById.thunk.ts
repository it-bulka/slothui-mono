import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { PostWithAttachmentsDto } from '@/shared/types';

export const fetchPostByIdThunk = createAsyncThunk<
  PostWithAttachmentsDto,
  { postId: string },
  ThunkAPI
>(
  'posts/fetchPostById',
  async ({ postId }, { extra, rejectWithValue }) => {
    try {
      return await extra.services.posts.getOne({ id: postId });
    } catch {
      return rejectWithValue('Failed to fetch post.');
    }
  }
);
