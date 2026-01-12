import type { RootState } from '@/app/config';
import { usersProfilesAdapter } from '../adapter/usersProfiles.adapter';

export const usersProfilesSelectors =
  usersProfilesAdapter.getSelectors<RootState>(
    (state) => state.usersProfiles
  );

export const selectUserProfile = (userId?: string) => (state: RootState) => {
  const user = usersProfilesSelectors.selectById(state, userId || '');
  if (!user) return {
    isLoading: false,
    error: null,
    data: null
  };

  const { isLoading, error, ...rest } = user;
  return {
    isLoading,
    error,
    data: rest
  };
}
