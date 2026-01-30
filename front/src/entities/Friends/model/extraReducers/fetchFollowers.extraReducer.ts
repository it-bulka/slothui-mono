import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { FriendsState } from '../type/friends.type.ts';
import { fetchFollowers } from '../thunk/fetchFollowers.thunk.ts';
import { friendsAdapter } from '../adapter/friends.adapter.ts';
import { mapFollowerDtoToEntity } from '../utils';
import { addUniqueIds } from '@/shared/libs';

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
      state.followersByUser[userId].error = undefined
    })

    .addCase(fetchFollowers.fulfilled, (state, action) => {
      const { userId } = action.meta.arg
      const { items, nextCursor, hasMore, followersLastViewedAt } = action.payload

      friendsAdapter.upsertMany(
        state,
        items.map(mapFollowerDtoToEntity)
      )

      const page = state.followersByUser[userId]

      page.ids = addUniqueIds(page.ids, items)
      page.hasMore = hasMore ?? false
      page.isLoading = false
      page.nextCursor = nextCursor
      page.followersLastSeenAt = followersLastViewedAt
    })

    .addCase(fetchFollowers.rejected, (state, action) => {
      const { userId } = action.meta.arg
      const page = state.followersByUser[userId]
      if (page) page.isLoading = false
      page.error = action.payload
    })

}