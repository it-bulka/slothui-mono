import { createEntityAdapter } from '@reduxjs/toolkit';
import type { FriendEntity } from '../type/friends.type.ts';

export const friendsAdapter = createEntityAdapter<FriendEntity, string>({
  selectId: (user) => user.id,
})