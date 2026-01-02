import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { FriendsState } from '../type/friends.type.ts';
import { fetchFollowings } from '../thunk/fetchFollowings.thunk.ts';
import { friendsAdapter } from '../adapter/friends.adapter.ts';

export const fetchFollowingsExtraReducer = (builder: ActionReducerMapBuilder<FriendsState>)=> {
  builder
    .addCase(fetchFollowings.pending, (state, action) => {
      const { userId } = action.meta.arg

      state.followingsByUser[userId] ??= {
        ids: [],
        isLoading: false,
        hasMore: true,
      }

      state.followingsByUser[userId].isLoading = true
    })
    .addCase(fetchFollowings.fulfilled, (state, action) => {
      const { userId } = action.meta.arg
      const { items, nextCursor, hasMore } = action.payload

      friendsAdapter.upsertMany(state, items)

      const page = state.followingsByUser[userId]

      page.ids.push(...items.map((u) => u.id))
      page.hasMore = hasMore
      page.isLoading = false
      page.nextCursor = nextCursor
    })

    .addCase(fetchFollowings.rejected, (state, action) => {
      const { userId } = action.meta.arg
      const page = state.followingsByUser[userId]
      if (page) page.isLoading = false
    })

}