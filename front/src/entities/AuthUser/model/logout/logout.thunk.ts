import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';

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
      extra.services.tokenManager.clearToken();
    } catch (err) {
      const errMsg = extra.extractErrorMessage(err, 'Failed to logout');
      return rejectWithValue(errMsg)
    }
})