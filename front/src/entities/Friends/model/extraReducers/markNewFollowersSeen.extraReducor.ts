import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { FriendsState } from '../type/friends.type.ts';
import { markNewFollowersSeenThunk } from '../thunk/markNewFollowersSeen.thunk.ts';

export const markNewFollowersSeenExtraReducer = (builder: ActionReducerMapBuilder<FriendsState>)=> {
  builder
    .addCase(markNewFollowersSeenThunk.fulfilled, (state, action) => {
      const { userId, followersLastSeenAt } = action.payload;
      if(state.followersByUser[userId]) {
        state.followersByUser[userId].followersLastSeenAt = followersLastSeenAt;
      }
    })
}