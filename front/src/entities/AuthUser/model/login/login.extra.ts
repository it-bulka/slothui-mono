import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { AuthUserState } from '../types.ts';
import { loginUser } from './loginUser.thunk.ts';
import { loginWithTelegramWidget } from './loginWithTelegramWidget.thunk.ts';
import type { IAuthResponse } from '@/shared/types';

const onPending = (state: AuthUserState) => {
  state.isLoading = true;
  state.data = null;
  state.isToken = false;
  state.error = null;
};

const onFulfilled = (state: AuthUserState, action: { payload: IAuthResponse }) => {
  state.isLoading = false;
  const { user, stats } = action.payload.profile;
  state.data = {
    id: user.id,
    username: user.username,
    nickname: user.nickname,
    email: user.email,
    avatarUrl: user.avatarUrl,
    linkedProviders: action.payload.linkedProviders,
    postsCount: stats.postsCount || 0,
    followersCount: stats.followersCount || 0,
    followeesCount: stats.followeesCount || 0,
  };
  state.isToken = !!action.payload.token;
};

const onRejected = (state: AuthUserState, action: { payload?: string | null }) => {
  state.isLoading = false;
  state.data = null;
  state.isToken = false;
  state.error = action.payload ?? null;
};

export const loginUserExtra = (builder: ActionReducerMapBuilder<AuthUserState>) => {
  builder
    .addCase(loginUser.pending, onPending)
    .addCase(loginUser.fulfilled, onFulfilled)
    .addCase(loginUser.rejected, onRejected)
    .addCase(loginWithTelegramWidget.pending, onPending)
    .addCase(loginWithTelegramWidget.fulfilled, onFulfilled)
    .addCase(loginWithTelegramWidget.rejected, onRejected);
};
