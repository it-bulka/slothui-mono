import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { IAuthResponse } from '@/shared/types';

export type TelegramWidgetUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
};

export const loginWithTelegramWidget = createAsyncThunk<
  IAuthResponse,
  TelegramWidgetUser,
  ThunkAPI
>(
  'loginWithTelegramWidget',
  async (data, { rejectWithValue, extra }) => {
    try {
      const result = await extra.services.auth.loginWithTelegram(data);
      await extra.services.initFeatureServices();
      return result;
    } catch (e) {
      const msg = extra.extractErrorMessage(e, 'Telegram login failed');
      return rejectWithValue(msg);
    }
  },
);
