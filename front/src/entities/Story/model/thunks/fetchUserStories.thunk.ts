import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { StoriesUserMeta, Story } from '@/entities/Story/model/types/types.tsx';
import { parseUserStories } from '@/entities/Story/model/utils/parseUserStories.ts';


interface StoryPayload {
  stories: Story[],
  usersMeta: StoriesUserMeta[]
}

export const fetchUserStoriesThunk = createAsyncThunk<
  StoryPayload,
  string,
  ThunkAPI
>(
  'stories/fetchUserStories',
  async (userId: string, { extra, rejectWithValue, getState }) => {
    try {
      const state = getState();
      const cached = state.stories.storiesByUser[userId];

      const now = Date.now();
      if (cached && cached.lastFetched && now - cached.lastFetched < 5 * 60 * 1000) {
        return rejectWithValue('cached');
      }

      const userStories = await extra.services.stories.getUserStories(userId);
      const { stories, usersMeta } = parseUserStories([userStories])
      return { stories, usersMeta };
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to fetch stories');
      return rejectWithValue(errMsg);
    }
  }
);