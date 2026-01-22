import { followUserThunk } from '../../../Friends';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { UsersProfilesState } from '../types/usersProfiles.types.ts';
import { usersProfilesAdapter } from '../adapter/usersProfiles.adapter.ts';

export const addFollowerExtraReducer = (builder: ActionReducerMapBuilder<UsersProfilesState>) => {
  builder
    .addCase(followUserThunk.fulfilled, (state, action) => {
      const userId = action.payload.profile.id;
      const user = state.entities[userId]
      if (user) {
        usersProfilesAdapter.updateOne(state, {
          id: userId,
          changes: {
            followersCount: user.followersCount + 1
          }
        });
      }
    })
}