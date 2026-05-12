import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { AuthUserState } from '../types.ts';
import { registerUser } from './registerUser.thunk.ts';

export const registerUserExtra = (builder: ActionReducerMapBuilder<AuthUserState>) => {
  builder
    .addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.data = null;
      state.isToken = false;
    })
    .addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.data = null;
      state.isToken = false;
      state.error = action.payload ?? null;
    })
};