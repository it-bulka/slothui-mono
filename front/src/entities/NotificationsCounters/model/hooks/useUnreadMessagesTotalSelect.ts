import { useAppSelector } from '@/shared/config/redux';
import {
  selectUnreadMessagesTotal
} from '../selectors/notificationCounters.selectors.ts';

export const useUnreadMessagesTotalSelect = () => {
  return useAppSelector(selectUnreadMessagesTotal)
}