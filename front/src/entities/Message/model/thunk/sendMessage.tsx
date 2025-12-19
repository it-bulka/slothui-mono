import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Message } from '@/shared/types';
import type { ThunkAPI } from '@/shared/config/redux';

export const sendMessage = createAsyncThunk<
  void,
  Message,
  ThunkAPI
>(
  'message/send',
  async (msg, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI

    try {
      const messagesService = extra.services.messages
      await messagesService.sendMessage(msg)
      return  // msg is getting via ws
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to send message');
      return rejectWithValue(errMsg)
    }
  }
);