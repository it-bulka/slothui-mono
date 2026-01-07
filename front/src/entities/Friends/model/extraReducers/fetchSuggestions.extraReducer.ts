import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { FriendsState } from '../type/friends.type.ts';
import { fetchSuggestions } from '../thunk/fetchSuggestions.ts';
import { friendsAdapter } from '../adapter/friends.adapter.ts';
import { mapFollowerDtoToEntity } from '../utils';

export const fetchSuggestionsExtraReducer = (builder: ActionReducerMapBuilder<FriendsState>)=> {
  builder
    .addCase(fetchSuggestions.pending, (state) => {
      state.suggestions.isLoading = true
    })

    .addCase(fetchSuggestions.fulfilled, (state, action) => {
      const { items, nextCursor, hasMore } = action.payload

      friendsAdapter.upsertMany(
        state,
        items.map(mapFollowerDtoToEntity)
      )

      state.suggestions.ids.push(...items.map((u) => u.id))
      state.suggestions.hasMore = hasMore
      state.suggestions.isLoading = false
      state.suggestions.nextCursor = nextCursor
    })

    .addCase(fetchSuggestions.rejected, (state) => {
      state.suggestions.isLoading = false
    })

}