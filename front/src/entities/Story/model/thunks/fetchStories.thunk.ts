import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import { parseUserStories } from '../utils/parseUserStories.ts';
import type { StoriesUserMeta, Story } from '../types/types.tsx';

interface StoriesPayload {
  hasMore: boolean,
  nextCursor?: string | null
  stories: Story[],
  usersMeta: StoriesUserMeta[]
}
export const fetchStoriesThunk = createAsyncThunk<
  StoriesPayload,
  { cursor?: string | null },
  ThunkAPI
>(
  'stories/fetchUsers',
  async (
    { cursor },
    { extra, rejectWithValue, getState }
  ) => {
    const state = getState().stories;
    const now = Date.now();
    if (
      !cursor
      && !state.hasMore
      && state.lastFetchedAll
      && now - state.lastFetchedAll < 60_000) {
      return rejectWithValue('cached');
    }
    try {
      const { items, nextCursor, hasMore } = await extra.services.stories.listUserWithStories(cursor);
      const { stories, usersMeta } = parseUserStories(items);

      return {
        stories,
        usersMeta,
        nextCursor,
        hasMore,
      }
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to fetch stories');
      return rejectWithValue(errMsg)
    }
  }
);