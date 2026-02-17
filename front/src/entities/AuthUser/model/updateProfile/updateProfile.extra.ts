import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { updateProfileThunk } from './updateProfile.thunk.ts';
import type { AuthUserState } from '../types.ts';

export const updateProfileExtra = (builder: ActionReducerMapBuilder<AuthUserState>) => {
  builder
    .addCase(updateProfileThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(updateProfileThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.data = {
        ...state.data,
        ...(action.payload || {}),
      };
    })
    .addCase(updateProfileThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? null;
    })
};