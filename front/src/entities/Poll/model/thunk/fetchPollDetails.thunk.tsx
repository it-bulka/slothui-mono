import { createAsyncThunk } from '@reduxjs/toolkit';
import type { PollResultDto } from '@/shared/types';
import type { ThunkAPI } from '@/shared/config/redux';

export const fetchPollDetailsThunk = createAsyncThunk<
  PollResultDto,
  string,
  ThunkAPI
>(
  'pollDetails/fetch',
  async (pollId, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI
    try {
      const pollService = extra.services.poll
      const res = await pollService.fetchDetails({ pollId })
      if(!res) throw new Error('')
      return res
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, `Failed to fetch poll details`);
      return rejectWithValue(errMsg)
    }
  }
);