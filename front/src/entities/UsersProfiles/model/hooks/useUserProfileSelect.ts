import { useAppSelector } from '@/shared/config/redux';
import { selectUserProfile } from '../selectors/usersProfiles.selectors.ts';

export const useUserProfileSelect = (userId?: string) => {
  return useAppSelector(selectUserProfile(userId))
}