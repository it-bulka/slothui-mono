import { createAsyncThunk } from '@reduxjs/toolkit';
import type { PaginatedResponse, VoterDetails } from '@/shared/types';
import type { ThunkAPI } from '@/shared/config/redux';

export interface PollVotersArg {
  pollId: string,
  answerId: string,
  cursor?: string | null,
  limit?: number
}

export const fetchPollVotersThunk = createAsyncThunk<
  PaginatedResponse<VoterDetails>,
  PollVotersArg,
  ThunkAPI
>(
  'pollVoters/fetch',
  async (arg, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI
    try {
      const pollService = extra.services.poll
      const res = await pollService.fetchVoters(arg)
      if(!res) throw new Error('')
      return res
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, `Failed to fetch poll details`);
      return rejectWithValue(errMsg)
    }
  }
);