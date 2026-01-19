import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { IAuthResponse, RegisterUserArgs } from '@/shared/types';

export const registerUser = createAsyncThunk<
  IAuthResponse,
  RegisterUserArgs,
  ThunkAPI
>(
  'registerUser',
  async (arg, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI

    try {
      const authService = extra.services.auth
      const res = await authService.registerByPassword(arg)
      if(!res) throw new Error('')
      return res
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to register');
      return rejectWithValue(errMsg)
    }
  }
)