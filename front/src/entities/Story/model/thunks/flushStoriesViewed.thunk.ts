import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';

export const flushStoriesViewedThunk = createAsyncThunk<
  string[],
  void,
  ThunkAPI
>(
  'stories/flushStoriesViewed',
  async (_, { getState, extra }) => {
    const state = getState();
    const queue = state.stories.viewedQueue;

    if (!queue.length) return [];

    const uniqueIds = Array.from(new Set(queue));
    await extra.services.stories.markStoriesVied(uniqueIds);

    return Array.from(uniqueIds)
  }
);
