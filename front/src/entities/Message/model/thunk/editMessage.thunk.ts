import { createAsyncThunk } from '@reduxjs/toolkit';
import type { MessageDto } from '@/shared/types';
import type { ThunkAPI } from '@/shared/config/redux';

export const editMessageThunk = createAsyncThunk<
  MessageDto,
  { chatId: string; messageId: string; text: string },
  ThunkAPI
>(
  'message/edit',
  async ({ chatId, messageId, text }, { extra, rejectWithValue }) => {
    try {
      return await extra.services.messages.editMessage(chatId, messageId, text);
    } catch (e) {
      return rejectWithValue(extra.extractErrorMessage(e, 'Failed to edit message'));
    }
  }
);
