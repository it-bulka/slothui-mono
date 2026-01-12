import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';
import type { FriendEntity } from '../type/friends.type.ts';

const selectFriendsState = (state: RootState) => state.friends;

const selectFriendEntities = (state: RootState) => state.friends.entities;

export const selectSuggestedFriends = createSelector(
  [selectFriendsState, selectFriendEntities],
  (friendsState, entities) => {
    const suggestionIds = friendsState.suggestions.ids;
    return suggestionIds.map(id => entities[id]).filter((f): f is FriendEntity => !!f);
  }
);
