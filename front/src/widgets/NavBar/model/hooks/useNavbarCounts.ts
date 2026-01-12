import {
  useUnreadMessagesTotalSelect,
  useNewFollowersCountSelect,
} from '@/entities';
import type { NavbarLinkType } from '../types';

export const useNavbarCounts = (): Partial<Record<NavbarLinkType, number>> => {
  const chatsCount = useUnreadMessagesTotalSelect()
  const friendsCount = useNewFollowersCountSelect()

  return {
    chats: chatsCount,
    friends: friendsCount,
  }
}