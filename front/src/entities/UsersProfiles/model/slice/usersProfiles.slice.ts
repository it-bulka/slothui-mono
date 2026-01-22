import { createSlice } from '@reduxjs/toolkit';
import { usersProfilesAdapter } from '../adapter/usersProfiles.adapter';
import type { UsersProfilesState } from '../types/usersProfiles.types.ts';
import {
  addFollowerExtraReducer,
  fetchProfileExtraReducer,
  removeFollowerExtraReducer
} from '../extraReducers';

const initialState = usersProfilesAdapter.getInitialState<UsersProfilesState>({
  ids: [],
  entities: {}
});

export const usersProfilesSlice = createSlice({
  name: 'usersProfiles',
  initialState,
  reducers: {
    invalidateUserProfile(state, action: { payload: { userId: string } }) {
      usersProfilesAdapter.removeOne(state, action.payload.userId);
    },

    updateFollowersCount(
      state,
      action: { payload: { userId: string; delta: number } }
    ) {
      const profile = state.entities[action.payload.userId];
      if (!profile) return;

      profile.followersCount += action.payload.delta;
      profile.fetchedAt = Date.now();
    },
  },
  extraReducers: (builder) => {
    fetchProfileExtraReducer(builder);
    addFollowerExtraReducer(builder);
    removeFollowerExtraReducer(builder);
  },
});

export const {
  reducer: usersProfilesReducer,
  actions: usersProfilesActions,
} = usersProfilesSlice;
