import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import { storiesActions } from '@/entities/Story';

export const deleteStoryThunk = createAsyncThunk<string, string, ThunkAPI>(
  'stories/delete',
  async (storyId, { extra, dispatch, rejectWithValue }) => {
    try {
      await extra.services.stories.deleteEvent(storyId);
      dispatch(storiesActions.removeStory(storyId));
      return storyId;
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to delete story');
      return rejectWithValue(errMsg);
    }
  }
);
