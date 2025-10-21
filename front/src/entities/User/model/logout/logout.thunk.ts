import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/app/config/store/config.ts';

export const logout = createAsyncThunk<
  void,
  void,
  ThunkAPI
>(
  'logout',
  async (_, thunkAPI)=> {
    const { extra, rejectWithValue } = thunkAPI;
    try {
      const authService = extra.services.auth;
      await authService.logout();
    } catch (err) {
      const errMsg = extra.extractErrorMessage(err, 'Failed to logout');
      return rejectWithValue(errMsg)
    }
})