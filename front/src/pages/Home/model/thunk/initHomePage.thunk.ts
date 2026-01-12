import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFeedPostsThunk, fetchAllEventsThunk } from '@/entities';
import type { ThunkAPI } from '@/shared/config/redux';

export const initHomePageThunk = createAsyncThunk<
  void,
  void,
  ThunkAPI
>(
  'home/init',
  async (_, { dispatch }) => {
    dispatch(fetchFeedPostsThunk());
    dispatch(fetchAllEventsThunk());
    /*
    dispatch(fetchFriendSuggestions());
    dispatch(fetchUpcomingEvents());
    dispatch(fetchProfileSummary());
    dispatch(fetchProfileStats());*/
  }
);
