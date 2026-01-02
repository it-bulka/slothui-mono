import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { FriendsState } from '../type/friends.type.ts';
import { removeFolloweeThunk } from '../thunk/removeFolowee.thunk.ts';

export const removeFolloweeExtraReducer = (builder: ActionReducerMapBuilder<FriendsState>) => {
  builder
    .addCase(removeFolloweeThunk.fulfilled, (state, action) => {
      const { followeeId, currentUserId } = action.payload;

      const followings = state.followingsByUser[currentUserId];
      if (followings) {
        followings.ids = followings.ids.filter(id => id !== followeeId);
      }

      state.suggestions.ids = state.suggestions.ids.filter(id => id !== followeeId);
    });
}