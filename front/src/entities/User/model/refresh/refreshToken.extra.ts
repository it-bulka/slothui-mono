import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { UserState } from '../types.ts';
import { refreshToken } from './refreshToken.thunk.ts';

export const refreshTokenExtra = (builder: ActionReducerMapBuilder<UserState>) => {
  builder
    .addCase(refreshToken.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(refreshToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
    })
    .addCase(refreshToken.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? null;
    })
};