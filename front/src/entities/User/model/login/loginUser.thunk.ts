import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/app/config/store/config.ts';
import type { IAuthResponse } from '../../types/Auth.ts';

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
      const res = await authService.loginByPassword(arg)
      return res;
    } catch (e) {
      const msg = extra.extractErrorMessage(e, 'Failed to login')
      return rejectWithValue(msg);
    }
  }
)