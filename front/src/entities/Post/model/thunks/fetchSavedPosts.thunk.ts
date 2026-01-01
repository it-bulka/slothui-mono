import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { PostWithAttachmentsDto } from '@/shared/types';
import type { PaginatedResponse } from '@/shared/types';

export const fetchSavedPostsThunk = createAsyncThunk<
  PaginatedResponse<PostWithAttachmentsDto>,
  { cursor?: string | null },
  ThunkAPI
>(
  'posts/fetchSavedPosts',
  async ({ cursor }, { extra, rejectWithValue }) => {
    try {
      return await extra.services.posts.getSavedPosts({ cursor });
    } catch {
      return rejectWithValue('Failed to fetch posts.');
    }
  }
)