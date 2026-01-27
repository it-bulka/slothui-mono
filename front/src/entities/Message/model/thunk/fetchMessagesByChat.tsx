import { createAsyncThunk } from '@reduxjs/toolkit';
import type { MessageDto } from '../../../../shared/types/message.dto.ts';
import type { PaginatedResponse } from '@/shared/types';
import type { ThunkAPI } from '@/shared/config/redux';


export const fetchMessagesByChatThunk = createAsyncThunk<
  PaginatedResponse<MessageDto>,
  { chatId: string, cursor?: string | null, limit?: number },
  ThunkAPI
>(
  'message/fetchByChat',
  async (arg, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI

    try {
      const messagesService = extra.services.messages
      const res = await messagesService.fetchMessagesByChat(arg)
      if(!res) throw new Error('')
      return res
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to fetch messages');
      return rejectWithValue(errMsg)
    }
  }
);