import { useAppSelector } from '@/shared/config/redux';
import {
  selectUnreadMessagesForChat
} from '../selectors/notificationCounters.selectors.ts';

export const useUnreadMessagesForChatSelect = (chatId: string) => {
  return useAppSelector(selectUnreadMessagesForChat(chatId))
}