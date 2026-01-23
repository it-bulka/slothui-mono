import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';

const selectProfileFeeds = (state: RootState) => state.posts.profile;
const selectUserId = (_: RootState, userId?: string) => userId;

export const selectProfileFeedState = createSelector(
  [selectProfileFeeds, selectUserId],
  (profileFeeds, userId) => {
    if(!userId) {
      return {
        ids: [],
        isLoading: false,
        hasMore: false,
        nextCursor: null,
      }
    }
    return profileFeeds[userId] ?? {
      ids: [],
      isLoading: false,
      hasMore: true,
      nextCursor: null,
    }
  }
);
