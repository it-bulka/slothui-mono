import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { FriendsState } from '../type/friends.type.ts';
import { unfollowThunk } from '../thunk/unfollow.thunk.ts';
import { friendsAdapter } from '../adapter/friends.adapter.ts';

export const removeFolloweeExtraReducer = (builder: ActionReducerMapBuilder<FriendsState>) => {
  builder
    .addCase(unfollowThunk.fulfilled, (state, action) => {
      const { followeeId, currentUserId } = action.payload;

      friendsAdapter.updateOne(state, {
        id: followeeId,
        changes: { isFollowee: false },
      })
      const followings = state.followingsByUser[currentUserId];
      if (followings) {
        followings.ids = followings.ids.filter(id => id !== followeeId);
      }

      state.suggestions.ids = state.suggestions.ids.filter(id => id !== followeeId);
    });
}