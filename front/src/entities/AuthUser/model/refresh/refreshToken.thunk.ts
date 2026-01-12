import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';

export const refreshToken = createAsyncThunk<
  { token: string },
  void,
  ThunkAPI
>(
  'refreshToken',
  async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    try {
      return await extra.services.auth.refreshToken()
    } catch (err) {
      const msg = extra.extractErrorMessage(err, 'Failed to refresh token');
      return rejectWithValue(msg)
    }
  }
)