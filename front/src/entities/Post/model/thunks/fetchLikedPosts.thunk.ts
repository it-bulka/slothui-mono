import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { PostWithAttachmentsDto } from '@/shared/types';
import type { PaginatedResponse } from '@/shared/types';

export const fetchLikedPostsThunk = createAsyncThunk<
  PaginatedResponse<PostWithAttachmentsDto>,
  { cursor?: string | null },
  ThunkAPI
>(
  'posts/fetchLikedPosts',
  async ({ cursor }, { extra, rejectWithValue }) => {
    try {
      return await extra.services.posts.getLikedPosts({ cursor });
    } catch {
      return rejectWithValue('Failed to fetch posts.');
    }
  },
  {
    condition: ({ cursor }, { getState }) => {
      const state = getState();
      const feed = state.posts.likes;

      const now = Date.now();
      if (feed.isLoading) return false;

      const lastCursor = feed.nextCursor;

      if (
        lastCursor === cursor &&
        feed.lastFetchedAt &&
        now - feed.lastFetchedAt < 60_000
      ) {
        return false;
      }

      return true;
    },
  }
)