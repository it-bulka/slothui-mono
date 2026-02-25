import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthUserState, UserState } from './types.ts';
import { loginUserExtra } from './login/login.extra.ts';
import { registerUserExtra } from './register/register.extra.ts';
import { logoutExtra } from './logout/logout.extra.ts';
import { updateProfileExtra } from './updateProfile/updateProfile.extra.ts';
import { deleteProfileExtra } from './deleteProfile/deleteProfile.extra.ts';
import { unfollowExtraReducer } from './extraReducers/unfollow.extra.ts';

const initialState: AuthUserState = {
  data: null,
  isToken: false,
  isLoading: false,
  error: null
};

export const authUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.data = action.payload;
    },
    clearUser(state) {
      state.data = null;
    },
    logoutLocal:() => {
      return initialState
    },
    increaseFollowersCount: (state) => {
      if(!state.data) return
      state.data.followersCount = state.data.followersCount + 1
    },
    decreaseFollowersCount: (state) => {
      if(!state.data) return
      state.data.followersCount = Math.max(0, state.data.followersCount - 1)
    },
    increaseFolloweesCount: (state) => {
      if(!state.data) return
      state.data.followeesCount = state.data.followeesCount + 1
    },
    decreaseFolloweesCount: (state) => {
      if(!state.data) return
      state.data.followeesCount = Math.max(0, state.data.followeesCount - 1)
    }
  },
  extraReducers: (builder) => {
    registerUserExtra(builder);
    loginUserExtra(builder);
    logoutExtra(builder);
    updateProfileExtra(builder);
    deleteProfileExtra(builder);
    unfollowExtraReducer(builder);
  }
});

export const { actions: authUserActions, reducer: authUserReducer } = authUserSlice
