import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  text: string;
  authorId: string;
}

interface CurrentChatState {
  chatId: string | null;
  messages: Message[];
}

const initialState: CurrentChatState = {
  chatId: null,
  messages: [],
};

const currentChatSlice = createSlice({
  name: 'currentChat',
  initialState,
  reducers: {
    openChat(state, action: PayloadAction<string>) {
      state.chatId = action.payload;
      state.messages = [];
    },
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
  }
})

export const {
  actions: currentChatActions,
  reducer: currentChatReducer,
} = currentChatSlice
