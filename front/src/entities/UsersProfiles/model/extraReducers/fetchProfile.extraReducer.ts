import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { UsersProfilesState } from '../types/usersProfiles.types.ts';
import { fetchUserProfileDataThunk } from '@/entities/UsersProfiles';

export const fetchProfileExtraReducer = (builder: ActionReducerMapBuilder<UsersProfilesState>) => {
  builder
    .addCase(fetchUserProfileDataThunk.pending, (state, action) => {
      const { userId } = action.meta.arg;
      state.entities[userId] ??= {
        isLoading: true,
        error: undefined,

        id: userId,
        nickname: '',
        username: '',
        postsCount: 0,
        followersCount: 0,
        followeesCount: 0,
        fetchedAt: Date.now()
      }
      state.entities[userId].isLoading = true;
      state.entities[userId].error = undefined;
    })
    .addCase(fetchUserProfileDataThunk.fulfilled, (state, action) => {
      const { user: u, stats } = action.payload.profile;
      state.entities[u.id] = {
        isLoading: false,

        id: u.id,
        nickname: u.nickname,
        username: u.username,
        postsCount: stats.postsCount ?? 0,
        followersCount: stats.followersCount ?? 0,
        followeesCount: stats.followeesCount ?? 0,
        fetchedAt: Date.now()
      }
    })
    .addCase(fetchUserProfileDataThunk.rejected, (state, action) => {
      const { userId } = action.meta.arg;

      state.entities[userId].isLoading = false;
      state.entities[userId].error = action.payload;
    });
}