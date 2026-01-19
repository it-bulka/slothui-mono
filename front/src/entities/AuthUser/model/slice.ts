import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthUserState } from './types.ts';
import { loginUserExtra } from './login/login.extra.ts';
import { registerUserExtra } from './register/register.extra.ts';
import { logoutExtra } from './logout/logout.extra.ts';
import type { UserWithStats } from '@/shared/types';

const initialState: AuthUserState = {
  data: null,
  isToken: false,
  isLoading: false,
  error: null
};

export const authUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserWithStats>) {
      state.data = action.payload;
    },
    clearUser(state) {
      state.data = null;
    },
    logoutLocal:() => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    registerUserExtra(builder);
    loginUserExtra(builder);
    logoutExtra(builder);
  }
});

export const { actions: authUserActions, reducer: authUserReducer } = authUserSlice
