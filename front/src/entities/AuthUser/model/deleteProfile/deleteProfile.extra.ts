import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { AuthUserState } from '../types.ts';
import { deleteProfileThunk } from './deleteProfile.thunk.ts';

export const deleteProfileExtra = (builder: ActionReducerMapBuilder<AuthUserState>) => {
  builder
    .addCase(deleteProfileThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(deleteProfileThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.data = null;
      state.isToken = false;
    })
    .addCase(deleteProfileThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isToken = false;
      state.error = action.payload ?? null;
    })
};