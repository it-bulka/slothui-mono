import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { AuthUserState } from '../types.ts';
import { initAuthUser } from './initAuthUser.thunk.ts';

export const initAuthUserExtra = (builder: ActionReducerMapBuilder<AuthUserState>) => {
  builder
    .addCase(initAuthUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(initAuthUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isInitialized = true;
      const { user, stats } = action.payload.profile;
      state.data = {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        email: user.email,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        linkedProviders: action.payload.linkedProviders,
        postsCount: stats.postsCount || 0,
        followersCount: stats.followersCount || 0,
        followeesCount: stats.followeesCount || 0,
      };
      state.isToken = true;
    })
    .addCase(initAuthUser.rejected, (state) => {
      state.isLoading = false;
      state.isInitialized = true;
      state.data = null;
      state.isToken = false;
    });
};
