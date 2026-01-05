import { storiesAdapter } from '../slice/adapter.ts';
import { fetchStoriesThunk } from '../thunks/fetchStories.thunk.ts';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { StoriesState } from '../types/types.tsx';

export const fetchStoriesExtraReducer = (builder: ActionReducerMapBuilder<StoriesState>) => {
  builder
    .addCase(fetchStoriesThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchStoriesThunk.fulfilled, (state, action) => {
      state.isLoading = false;

      const { stories, usersMeta, nextCursor, hasMore } = action.payload;

      storiesAdapter.upsertMany(state, stories);

      usersMeta.forEach(user => {
        state.storiesByUser[user.userId] = user;
        if (!state.usersOrder.includes(user.userId)) state.usersOrder.push(user.userId);
      });

      state.cursor = nextCursor;
      state.hasMore = hasMore;
    })
    .addCase(fetchStoriesThunk.rejected, (state, action) => {
      state.isLoading = false;
      if(action.error.message !== 'cached') {
        state.error = action.error.message || 'Failed to load stories';
      }
    });
};