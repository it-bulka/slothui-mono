import {
  useChatsTotalUnreadCount,
  useUserSelector,
  useUnseenFollowersCountSelect
} from '@/entities';
import type { NavbarLinkType } from '../types';

export const useNavbarCounts = (): Partial<Record<NavbarLinkType, number>> => {
  const user = useUserSelector()
  const chatsCount = useChatsTotalUnreadCount(user?.id)
  const friendsCount = useUnseenFollowersCountSelect(user?.id)

  return {
    chats: chatsCount,
    friends: friendsCount,
  }
}