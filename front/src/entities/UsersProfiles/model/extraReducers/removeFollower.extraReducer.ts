import { unfollowThunk } from '../../../Friends';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { UsersProfilesState } from '../types/usersProfiles.types.ts';
import { usersProfilesAdapter } from '../adapter/usersProfiles.adapter.ts';

export const removeFollowerExtraReducer = (builder: ActionReducerMapBuilder<UsersProfilesState>) => {
  builder
    .addCase(unfollowThunk.fulfilled, (state, action) => {
      const userId = action.payload.followeeId;
      const user = state.entities[userId]
      if (user) {
        usersProfilesAdapter.updateOne(state, {
          id: userId,
          changes: {
            followersCount: Math.max(user.followersCount - 1, 0)
          }
        });
      }
    })
}