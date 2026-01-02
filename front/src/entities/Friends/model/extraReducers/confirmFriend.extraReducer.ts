import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { FriendsState } from '../type/friends.type.ts';
import { confirmFriendThunk } from '../thunk/confirmFriend.thunk.ts';
import { friendsAdapter } from '../adapter/friends.adapter.ts';

export const confirmFriendExtraReducer = (builder: ActionReducerMapBuilder<FriendsState>)=> {
  builder
    .addCase(confirmFriendThunk.fulfilled, (state, action) => {
      const user = action.payload
      const myId = 'me'

      friendsAdapter.upsertOne(state, user)

      // followers
      state.followersByUser[myId] ??= { ids: [] }
      state.followersByUser[myId].ids.unshift(user.id)

      // followings
      state.followingsByUser[myId] ??= { ids: [] }
      state.followingsByUser[myId].ids.unshift(user.id)
    })
}