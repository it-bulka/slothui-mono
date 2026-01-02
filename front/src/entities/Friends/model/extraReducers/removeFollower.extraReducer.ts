import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { FriendsState } from '../type/friends.type.ts';
import { removeFollowerThunk } from '../thunk/removeFollower.thunk.ts';

export const removeFollowerExtraReducer = (builder: ActionReducerMapBuilder<FriendsState>)=> {
  builder
    .addCase(removeFollowerThunk.fulfilled, (state, action) => {
      const { followerId, currentUserId } = action.payload;

      const followers = state.followersByUser[currentUserId];
      if (followers) {
        followers.ids = followers.ids.filter(id => id !== followerId);
      }

      state.suggestions.ids = state.suggestions.ids.filter(id => id !== followerId);
    });
}