import { createEntityAdapter } from '@reduxjs/toolkit';
import type { UserShort } from '@/shared/types';

export const friendsAdapter = createEntityAdapter<UserShort, string>({
  selectId: (user) => user.id,
})