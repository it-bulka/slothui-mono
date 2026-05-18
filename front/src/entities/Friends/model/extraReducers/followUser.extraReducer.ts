import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { FriendsState } from '../type/friends.type.ts';
import { followUserThunk } from '../thunk/followUser.thunk.ts';
import { friendsAdapter } from '../adapter/friends.adapter.ts';
import { mapFollowerDtoToEntity } from '../utils';
import { prependUniqueIds } from '@/shared/libs/prependUniqueIds';

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

      // Add current user to the followed user's followers list (if already loaded)
      const profileFollowers = state.followersByUser[user.id];
      if (profileFollowers) {
        const me = action.payload.currentUserProfile;
        if (me) {
          if (!state.entities[myId]) {
            friendsAdapter.upsertOne(state, {
              id: me.id,
              src: me.avatarUrl ?? null,
              username: me.username,
              nickname: me.nickname,
              isFollowee: false,
              isFollower: true,
              followedAt: Date.now(),
            });
          }
          profileFollowers.ids = prependUniqueIds(profileFollowers.ids, [{ id: myId }]);
          profileFollowers.lastFetchedAt = null;
        }
      }
    })
}