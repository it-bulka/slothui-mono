import { useAppSelector } from '@/shared/config/redux';
import { selectSuggestedFriends } from '../selectors/selectSuggestedFriends.ts';

export const useSuggestedFriendsSelect = () => {
  return useAppSelector(selectSuggestedFriends)
}