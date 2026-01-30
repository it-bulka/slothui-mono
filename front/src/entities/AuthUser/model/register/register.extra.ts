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
    .addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      const { user } = action.payload.profile;
      state.data = {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        email: user.email,
        avatarUrl: user.avatarUrl,
        postsCount: 0,
        followersCount: 0,
        followeesCount: 0
      };
      state.isToken = !!action.payload.token;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.data = null;
      state.isToken = false;
      state.error = action.payload ?? null;
    })
};