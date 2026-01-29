import { useAppSelector } from '@/shared/config/redux';
import { selectUserChatsState } from '../selectors/selectUserChatsState.ts';

export const useUserChatStateSelect = () => {
  return useAppSelector(state => selectUserChatsState(state))
}