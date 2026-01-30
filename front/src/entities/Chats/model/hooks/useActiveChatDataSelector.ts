import { useAppSelector } from '@/shared/config/redux';
import { selectActiveChat } from '../selectors/selectActiveChatData.ts';

export const useActiveChatDataSelector = () => {
  return useAppSelector(selectActiveChat)
}