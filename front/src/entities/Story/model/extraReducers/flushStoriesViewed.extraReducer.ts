import { flushStoriesViewedThunk } from '../thunks/flushStoriesViewed.thunk.ts';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { StoriesState } from '../types/types.tsx';

export const flushStoriesViewedExtraReducer = (builder: ActionReducerMapBuilder<StoriesState>) => {
  builder
    .addCase(flushStoriesViewedThunk.fulfilled, (state, action) => {
      if (!action.payload.length) return;

      const flushedIds = new Set(action.payload);

      state.viewedQueue = state.viewedQueue.filter(
        id => !flushedIds.has(id)
      );
    })
};