import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';

export const deleteProfileThunk = createAsyncThunk<
  void,
  void,
  ThunkAPI
>(
  'deleteProfile',
  async (_arg, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI

    try {
      const authService = extra.services.user
      return await authService.deleteProfile()
    } catch (e) {
      const msg = extra.extractErrorMessage(e, 'Failed to delete profile');
      return rejectWithValue(msg);
    }
  }
)