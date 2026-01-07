import { useAppSelector } from '@/shared/config/redux';
import { selectUserChats } from '../selectors/selectUserChats.ts';

export const useUserChatSelect = (userId: string) => {
  return useAppSelector(state => selectUserChats(state, userId))
}