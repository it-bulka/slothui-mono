import { createEntityAdapter } from '@reduxjs/toolkit';
import type { FriendEntity } from '../type/friends.type.ts';
import type { RootState } from '@/app/config';

export const friendsAdapter = createEntityAdapter<FriendEntity, string>({
  selectId: (user) => user.id,
})

export const {
  selectById: selectFriendById,
  selectEntities: selectFriendsEntities,
} = friendsAdapter.getSelectors<RootState>(
  state => state.friends
)