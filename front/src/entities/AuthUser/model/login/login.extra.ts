import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { AuthUserState } from '../types.ts';
import { loginUser } from './loginUser.thunk.ts';

export const loginUserExtra = (builder: ActionReducerMapBuilder<AuthUserState>) => {
  builder
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.data = null;
      state.isToken = false;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      const { user, stats } = action.payload.profile;
      state.data = {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        email: user.email,
        avatarUrl: user.avatarUrl,
        postsCount: stats.postsCount || 0,
        followersCount: stats.followersCount || 0,
        followeesCount: stats.followeesCount || 0,
      };
      state.isToken = !!action.payload.token;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.data = null;
      state.isToken = false;
      state.error = action.payload ?? null;
    })
};