import { createEntityAdapter } from '@reduxjs/toolkit';
import type { FriendDto } from '@/shared/types';

export const friendsAdapter = createEntityAdapter<FriendDto, string>({
  selectId: (user) => user.id,
})