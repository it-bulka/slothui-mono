import { createSlice } from '@reduxjs/toolkit';
import { usersProfilesAdapter } from '../adapter/usersProfiles.adapter';
import { fetchUserProfileStatsThunk } from '../thunk/fetchUserProfileStatsThunk.ts';
import type { UsersProfilesState } from '@/entities/UsersProfiles/model/types/usersProfiles.types.ts';

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
    builder
      .addCase(fetchUserProfileStatsThunk.pending, (state, action) => {
        const { userId } = action.meta.arg;
        state.entities[userId] ??= {
          isLoading: true,
          error: undefined,

          id: userId,
          nickname: '',
          username: '',
          postsCount: 0,
          followersCount: 0,
          followingCount: 0,
          fetchedAt: Date.now()
        }
        state.entities[userId].isLoading = true;
        state.entities[userId].error = undefined;
      })
      .addCase(fetchUserProfileStatsThunk.fulfilled, (state, action) => {
        const { userId } = action.meta.arg;

        usersProfilesAdapter.upsertOne(state, action.payload);
        state.entities[userId].isLoading = false;
      })
      .addCase(fetchUserProfileStatsThunk.rejected, (state, action) => {
        const { userId } = action.meta.arg;

        state.entities[userId].isLoading = false;
        state.entities[userId].error = action.payload;
      });
  },
});

export const {
  reducer: usersProfilesReducer,
  actions: usersProfilesActions,
} = usersProfilesSlice;
