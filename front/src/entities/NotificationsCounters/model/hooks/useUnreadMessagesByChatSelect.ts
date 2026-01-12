import { useAppSelector } from '@/shared/config/redux';
import {
  selectUnreadMessagesByChat
} from '../selectors/notificationCounters.selectors.ts';

export const useUnreadMessagesByChatSelect = () => {
  return useAppSelector(selectUnreadMessagesByChat)
}