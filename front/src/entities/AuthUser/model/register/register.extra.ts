import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { AuthUserState } from '../types.ts';
import { registerUser } from './registerUser.thunk.ts';

export const registerUserExtra = (builder: ActionReducerMapBuilder<AuthUserState>) => {
  builder
    .addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.data = null;
      state.token = null;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.user;
      state.token = action.payload.token;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.data = null;
      state.token = null;
      state.error = action.payload ?? null;
    })
};