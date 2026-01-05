import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { StoriesState, Story } from '../types/types.tsx';
import { storiesAdapter } from '../slice/adapter.ts';
import {
  fetchStoriesExtraReducer,
  flushStoriesViewedExtraReducer,
  fetchStoriesByUserExtraReducer
} from '../extraReducers';

const initialState = storiesAdapter.getInitialState<StoriesState>({
  entities: {}, // Story
  ids: [],

  storiesByUser: {},
  viewedQueue: [],
  usersOrder: [],

  cursor: null,
  hasMore: true,
  isLoading: false
});

export const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    addStory(state, action: PayloadAction<Story>) {
      const story = action.payload;
      storiesAdapter.addOne(state, story);

      const meta = state.storiesByUser[story.userId];
      if (!meta) return;

      meta.storyIds.push(story.id);
      meta.totalStories += 1;
      meta.hasUnseen = true;
      meta.lastStoryAt = story.createdAt;
    },

    markStoryViewedLocally(state, action: PayloadAction<string>) {
      const id = action.payload;
      const story = state.entities[id];
      if (!story || story.isViewed) return;

      story.isViewed = true;
      state.viewedQueue.push(id);

      const meta = state.storiesByUser[story.userId];
      if (!meta) return;

      meta.viewedStories += 1;
      meta.hasUnseen = meta.viewedStories < meta.totalStories;
    },
    removeStory(state, action: PayloadAction<string>) {
      const id = action.payload;
      const story = state.entities[id];
      if (!story) return;

      storiesAdapter.removeOne(state, id);

      const meta = state.storiesByUser[story.userId];
      if (!meta) return;

      meta.storyIds = meta.storyIds.filter(sid => sid !== id);
      meta.totalStories -= 1;
      meta.hasUnseen = meta.viewedStories < meta.totalStories;
    },
    clearViewedQueue(state, ) {
      state.viewedQueue = [];
    },
  },
  extraReducers: (builder) => {
    fetchStoriesExtraReducer(builder);
    flushStoriesViewedExtraReducer(builder);
    fetchStoriesByUserExtraReducer(builder);
  },
});

export  const storiesReducer = storiesSlice.reducer;
export  const storiesActions = storiesSlice.actions;
