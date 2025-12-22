import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ChatDTO } from '@/shared/types/chat.types.ts';
import type { ThunkAPI } from '@/shared/config/redux';

export const createPrivateChatThunk = createAsyncThunk<
  ChatDTO,
  string,
  ThunkAPI
>(
  'chats/createPrivate',
  async (userId, { extra, rejectWithValue }) => {
    try {
      const chat = await extra.services.chat.createChat([userId]);
      if (!chat) throw new Error('')
      return chat;
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to create chat');
      return rejectWithValue(errMsg);
    }
  }
);
