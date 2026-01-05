import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { StoriesState } from '../types/types.tsx';
import { fetchUserStoriesThunk } from '../thunks/fetchUserStories.thunk.ts';
import { storiesAdapter } from '../slice/adapter.ts';

export const fetchStoriesByUserExtraReducer = (builder: ActionReducerMapBuilder<StoriesState>) => {
  builder
    .addCase(fetchUserStoriesThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchUserStoriesThunk.fulfilled, (state, action) => {
      state.isLoading = false;

      const { stories, usersMeta } = action.payload;

      storiesAdapter.upsertMany(state, stories);

      usersMeta.forEach(user => {
        state.storiesByUser[user.userId] = {
          ...state.storiesByUser[user.userId], // merge
          ...user
        };
        if (!state.usersOrder.includes(user.userId)) {
          state.usersOrder.push(user.userId);
        }
      });
    })
    .addCase(fetchUserStoriesThunk.rejected, (state, action) => {
      state.isLoading = false;
      if(action.error.message !== 'cached') {
        state.error = action.error.message || 'Failed to fetch user stories';
      }
    });
}