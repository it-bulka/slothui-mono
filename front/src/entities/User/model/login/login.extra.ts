import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { UserState } from '../types.ts';
import { loginUser } from './loginUser.thunk.ts';

export const loginUserExtra = (builder: ActionReducerMapBuilder<UserState>) => {
  builder
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.data = null;
      state.token = null;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.user;
      state.token = action.payload.token;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.data = null;
      state.token = null;
      state.error = action.payload ?? null;
    })
};