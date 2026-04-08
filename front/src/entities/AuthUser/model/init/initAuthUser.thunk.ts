import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { IAuthResponse } from '@/shared/types';

export const initAuthUser = createAsyncThunk<
  Omit<IAuthResponse, 'token'>,
  void,
  ThunkAPI
>(
  'initAuthUser',
  async (_, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI;
    try {
      return await extra.services.user.getMyProfileData();
    } catch (e) {
      const msg = extra.extractErrorMessage(e, 'Failed to initialize session');
      return rejectWithValue(msg);
    }
  }
);
