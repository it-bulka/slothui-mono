import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// TODO: extend User interface
interface User {
  id: string;
  username: string;
  nickname: string;
}

interface UsersState {
  list: User[];
  isLoading: boolean;
}

const initialState: UsersState = {
  list: [],
  isLoading: false,
};

export const usersSuggestionsSlice = createSlice({
  name: 'usersSuggestions',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.list = action.payload;
    },
  },
});

export const {
  actions: usersSuggestionsActions,
  reducer: usersSuggestionsReducer,
} = usersSuggestionsSlice
