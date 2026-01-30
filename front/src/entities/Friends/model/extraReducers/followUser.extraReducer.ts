import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { FriendsState } from '../type/friends.type.ts';
import { followUserThunk } from '../thunk/followUser.thunk.ts';
import { friendsAdapter } from '../adapter/friends.adapter.ts';
import { mapFollowerDtoToEntity } from '../utils';
import { prependUniqueIds } from '@/shared/libs';

export const followUserExtraReducer = (builder: ActionReducerMapBuilder<FriendsState>)=> {
  builder
    .addCase(followUserThunk.fulfilled, (state, action) => {
      const user = action.payload.profile

      friendsAdapter.upsertOne(state, mapFollowerDtoToEntity(user))

      const myId =  action.payload.currentUserId
      state.followingsByUser[myId] ??= {
        ids: []
      }
      state.followingsByUser[myId].ids = prependUniqueIds(
        state.followingsByUser[myId].ids,
        [{ id: user.id}]
      )

      // ? move from suggestions
      state.suggestions.ids = state.suggestions.ids.filter(
        id => id !== user.id
      )
    })
}