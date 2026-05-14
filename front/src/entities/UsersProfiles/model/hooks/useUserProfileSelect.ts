import { useAppSelector } from '@/shared/config/redux';
import { selectUserProfile } from '../selectors/usersProfiles.selectors.ts';
import { useMemo } from 'react';

export const useUserProfileSelect = (userId?: string) => {
  const user = useAppSelector(selectUserProfile(userId));

  return useMemo(() => {
    if (!user) return { isLoading: false, error: null, data: null };
    const { isLoading, error, ...rest } = user;
    return { isLoading, error, data: rest };
  }, [user]);
};
