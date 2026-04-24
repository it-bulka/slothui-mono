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
  },
  {
    condition: ({ cursor }, { getState }) => {
      const state = getState();
      const feed = state.posts.saves;
      const lastCursor = feed.nextCursor;

      const now = Date.now();

      if (
        cursor === lastCursor &&
        !feed.hasMore &&
        feed.lastFetchedAt &&
        now - feed.lastFetchedAt < 60_000
      ) {
        return false;
      }

      return true;
    },
  }
)