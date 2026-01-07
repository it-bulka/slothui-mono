import { useAppSelector } from '@/shared/config/redux';
import { selectTotalUnreadForUser } from '@/entities/Chats/model/selectors/selectTotalUnreadCount.ts';

export const useChatsTotalUnreadCount = (userId?: string) => {
  return useAppSelector(state => selectTotalUnreadForUser(state, userId));
}