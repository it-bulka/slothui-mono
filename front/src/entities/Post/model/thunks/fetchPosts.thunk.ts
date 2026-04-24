import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { PostWithAttachmentsDto } from '@/shared/types';
import type { PaginatedResponse } from '@/shared/types';

export const fetchFeedPostsThunk = createAsyncThunk<
  PaginatedResponse<PostWithAttachmentsDto>,
  { cursor?: string | null } | void,
  ThunkAPI
>(
  'posts/fetchPosts',
  async ({ cursor } = {}, { extra, rejectWithValue }) => {
    try {
      const res = await extra.services.posts.getList({ cursor });
      console.log('fetchFeedPostsThunk', res)
      return res
    } catch {
      return rejectWithValue('Failed to fetch posts.');
    }
  },
  {
    condition: ({ cursor } = {}, { getState }) => {
      const state = getState();
      const home = state.posts.home;

      const now = Date.now();
      const lastCursor = home.nextCursor;

      const sameCursor = lastCursor === cursor;
      const freshRequest =
        home.lastFetchedAt &&
        now - home.lastFetchedAt < 5000;

      return !(sameCursor && freshRequest);
    }
  }
);