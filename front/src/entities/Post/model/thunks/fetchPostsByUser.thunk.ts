import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { PostWithAttachmentsDto } from '@/shared/types';
import type { PaginatedResponse } from '@/shared/types';

export const fetchPostsByUserThunk = createAsyncThunk<
  PaginatedResponse<PostWithAttachmentsDto>,
  { userId: string, cursor?: string | null },
  ThunkAPI
>(
  'posts/fetchPostsByUser',
  async ({ userId, cursor }, { extra, rejectWithValue }) => {
    try {
      return await extra.services.posts.getList({ userId, cursor });
    } catch {
      return rejectWithValue('Failed to fetch posts.');
    }
  }
)