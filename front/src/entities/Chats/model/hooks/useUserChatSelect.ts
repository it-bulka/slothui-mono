import { useAppSelector } from '@/shared/config/redux';
import { selectUserChats } from '../selectors/selectUserChats.ts';

export const useUserChatSelect = () => {
  return useAppSelector(state => selectUserChats(state))
}