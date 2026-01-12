import { createSlice } from '@reduxjs/toolkit';
import { fetchProfileAnalyticsThunk } from '../thunks/fetchProfileAnalyticsThunk.ts';
import type { ProfileAnalyticsState } from '../types/profile-analitycs.types.ts';

const initialState: ProfileAnalyticsState = {
  isLoading: false,
};

export const profileAnalyticsSlice = createSlice({
  name: 'profileAnalytics',
  initialState,
  reducers: {
    resetProfileAnalytics: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileAnalyticsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchProfileAnalyticsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfileAnalyticsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  reducer: analyticsReducer,
  actions: analyticsActions,
} = profileAnalyticsSlice;
