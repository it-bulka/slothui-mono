import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { IAuthResponse } from '@/shared/types';

type IRegister = { email: string, password: string }
export const loginUser = createAsyncThunk<
  IAuthResponse,
  IRegister,
  ThunkAPI
>(
  'loginUser',
  async (arg, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI

    try {
      const authService = extra.services.auth
      return await authService.loginByPassword(arg)
    } catch (e) {
      const msg = extra.extractErrorMessage(e, 'Failed to login')
      return rejectWithValue(msg);
    }
  }
)