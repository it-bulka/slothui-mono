import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { AuthUserState } from '../types.ts';
import { logout } from './logout.thunk.ts';

export const logoutExtra = (builder: ActionReducerMapBuilder<AuthUserState>) => {
  builder
    .addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.data = null;
      state.token = null;
    })
    .addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? null;
    })
};