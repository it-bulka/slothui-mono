import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { FriendsState } from '../type/friends.type.ts';
import { fetchFollowers } from '../thunk/fetchFollowers.thunk.ts';
import { friendsAdapter } from '../adapter/friends.adapter.ts';
import { mapFollowerDtoToEntity } from '../utils';

export const fetchFollowersExtraReducer = (builder: ActionReducerMapBuilder<FriendsState>)=> {
  builder
    .addCase(fetchFollowers.pending, (state, action) => {
      const { userId } = action.meta.arg

      state.followersByUser[userId] ??= {
        ids: [],
        isLoading: false,
        hasMore: true,
        followersLastSeenAt: 0
      }

      state.followersByUser[userId].isLoading = true
    })

    .addCase(fetchFollowers.fulfilled, (state, action) => {
      const { userId } = action.meta.arg
      const { items, nextCursor, hasMore, followersLastViewedAt } = action.payload

      friendsAdapter.upsertMany(
        state,
        items.map(mapFollowerDtoToEntity)
      )

      const page = state.followersByUser[userId]

      page.ids.push(...items.map((u) => u.id))
      page.hasMore = hasMore
      page.isLoading = false
      page.nextCursor = nextCursor
      page.followersLastSeenAt = followersLastViewedAt
    })

    .addCase(fetchFollowers.rejected, (state, action) => {
      const { userId } = action.meta.arg
      const page = state.followersByUser[userId]
      if (page) page.isLoading = false
    })

}