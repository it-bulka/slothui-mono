import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../types/User.ts';
import type { UserState } from '@/entities/User/model/types.ts';
import { loginUserExtra } from './login/login.extra.ts';
import { registerUserExtra } from './register/register.extra.ts';
import { logoutExtra } from './logout/logout.extra.ts';
import { refreshTokenExtra } from './refresh/refreshToken.extra.ts';

const initialState: UserState = {
  data: null,
  token: null,
  isLoading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.data = action.payload;
    },
    clearUser(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    registerUserExtra(builder);
    loginUserExtra(builder);
    logoutExtra(builder);
    refreshTokenExtra(builder);
  }
});

export const { actions: userActions, reducer: userReducer } = userSlice
