import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { PostWithAttachmentsDto } from '@/shared/types';
import type { PaginatedResponse } from '@/shared/types';

export const fetchFeedPostsThunk = createAsyncThunk<
  PaginatedResponse<PostWithAttachmentsDto>,
  { cursor?: string | null },
  ThunkAPI
>(
  'posts/fetchPosts',
  async ({ cursor }, { extra, rejectWithValue }) => {
    try {
      return await extra.services.posts.getList({ cursor });
    } catch {
      return rejectWithValue('Failed to fetch posts.');
    }
  }
)