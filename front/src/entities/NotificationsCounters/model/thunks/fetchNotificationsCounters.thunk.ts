import { createAsyncThunk } from '@reduxjs/toolkit';
import type { NotificationsCountersEntity } from '../types/notificationsCounters.types.ts';
import type { ThunkAPI } from '@/shared/config/redux';

export const fetchNotificationsCountersThunk = createAsyncThunk<
  NotificationsCountersEntity,
  void,
  ThunkAPI
>(
  'notificationsCounters/fetch',
  async (_arg, { extra }) => {
    return await extra.services.notificationsCounters.getCounters();
  }
);
