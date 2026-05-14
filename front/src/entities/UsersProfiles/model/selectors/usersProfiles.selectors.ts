import type { RootState } from '@/app/config';
import { usersProfilesAdapter } from '../adapter/usersProfiles.adapter';

export const usersProfilesSelectors =
  usersProfilesAdapter.getSelectors<RootState>(
    (state) => state.usersProfiles
  );

export const selectUserProfile = (userId?: string) => (state: RootState) =>
  usersProfilesSelectors.selectById(state, userId || '');
