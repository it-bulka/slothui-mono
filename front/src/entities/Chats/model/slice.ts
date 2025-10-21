import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
}

interface ChatState {
  list: Chat[];
}

const initialState: ChatState = {
  list: [],
};

export const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<Chat[]>) {
      state.list = action.payload;
    },
  }
});

export const { actions: chatsActions, reducer: chatsReducer } = chatSlice;
