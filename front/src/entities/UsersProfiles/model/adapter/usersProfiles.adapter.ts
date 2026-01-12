import { createEntityAdapter } from '@reduxjs/toolkit';
import type { UserProfile } from '../types/usersProfiles.types.ts';

export const usersProfilesAdapter = createEntityAdapter<UserProfile, string>({
  selectId: (profile) => profile.id,
  sortComparer: false,
});
