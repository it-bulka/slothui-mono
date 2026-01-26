import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { PostWithAttachmentsDto } from '@/shared/types';
import type { PaginatedResponse } from '@/shared/types';

export const fetchMyPostsThunk = createAsyncThunk<
  PaginatedResponse<PostWithAttachmentsDto>,
  { cursor?: string | null, currentUserId: string },
  ThunkAPI
>(
  'posts/fetchMyPosts',
  async (arg, { extra, rejectWithValue }) => {
    try {
      return await extra.services.posts.getMyPosts({ cursor: arg.cursor });
    } catch {
      return rejectWithValue('Failed to fetch posts.');
    }
  }
)