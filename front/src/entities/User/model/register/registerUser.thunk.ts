import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/app/config/store/config.ts';
import type { IAuthResponse } from '../../types/Auth.ts';

type IRegister = { email: string, name: string, password: string }
export const registerUser = createAsyncThunk<
  IAuthResponse,
  IRegister,
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