import { selectFriendById } from '../slice/friends.slice.ts';
import { useAppSelector } from '@/shared/config/redux';

export const useFriendByIdSelect = (userId?: string) => {
  return useAppSelector(state => selectFriendById(state, userId || ''))
}