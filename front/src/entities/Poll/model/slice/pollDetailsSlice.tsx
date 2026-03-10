import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PollDetailsState } from '../type/pollDetails.state.ts';
import { pollDetailsAdapter } from './pollDetails.adapter.ts';
import { fetchPollDetailsExtraReducer, fetchPollVotersExtraReducer } from '../extraReducers';

const initialState = pollDetailsAdapter.getInitialState<PollDetailsState>({
  entities: {},
  ids:[],
  loading: {},
  error: {},
})

const pollDetailsSlice = createSlice({
  name: 'pollDetails',
  initialState,
  reducers: {
    clearPollDetails: (state, action: PayloadAction<string>) => {
      const pollId = action.payload;

      pollDetailsAdapter.removeOne(state, pollId);

      delete state.loading[pollId];
      delete state.error[pollId];
    }
  },
  extraReducers: (builder) => {
    fetchPollDetailsExtraReducer(builder);
    fetchPollVotersExtraReducer(builder);
  }
});

export const { clearPollDetails } = pollDetailsSlice.actions;
export const pollDetailsReducer = pollDetailsSlice.reducer;
