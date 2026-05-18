import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { Story } from '@/entities/Story/model/types/types.tsx';
import { storiesActions } from '@/entities/Story';

export const createStoryThunk = createAsyncThunk<Story, File, ThunkAPI>(
  'stories/create',
  async (file, { extra, dispatch, rejectWithValue, getState }) => {
    try {
      const dto = await extra.services.stories.createStory({ file });
      const story: Story = {
        id: dto.id,
        url: dto.url,
        type: dto.type,
        userId: dto.userId,
        createdAt: dto.createdAt,
        expiresAt: dto.expiresAt ?? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        isViewed: false,
      };
      const authUser = getState().authUser.data;
      dispatch(storiesActions.addStory({
        story,
        nickname: authUser?.nickname,
        avatarUrl: authUser?.avatarUrl ?? undefined,
      }));
      return story;
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to create story');
      return rejectWithValue(errMsg);
    }
  }
);
