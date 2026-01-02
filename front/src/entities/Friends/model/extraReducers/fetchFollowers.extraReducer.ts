import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { FriendsState } from '../type/friends.type.ts';
import { fetchFollowers } from '../thunk/fetchFollowers.thunk.ts';
import { friendsAdapter } from '../adapter/friends.adapter.ts';

export const fetchFollowersExtraReducer = (builder: ActionReducerMapBuilder<FriendsState>)=> {
  builder
    .addCase(fetchFollowers.pending, (state, action) => {
      const { userId } = action.meta.arg

      state.followersByUser[userId] ??= {
        ids: [],
        isLoading: false,
        hasMore: true,
      }

      state.followersByUser[userId].isLoading = true
    })

    .addCase(fetchFollowers.fulfilled, (state, action) => {
      const { userId } = action.meta.arg
      const { items, nextCursor, hasMore } = action.payload

      friendsAdapter.upsertMany(state, items)

      const page = state.followersByUser[userId]

      page.ids.push(...items.map((u) => u.id))
      page.hasMore = hasMore
      page.isLoading = false
      page.nextCursor = nextCursor
    })

    .addCase(fetchFollowers.rejected, (state, action) => {
      const { userId } = action.meta.arg
      const page = state.followersByUser[userId]
      if (page) page.isLoading = false
    })

}