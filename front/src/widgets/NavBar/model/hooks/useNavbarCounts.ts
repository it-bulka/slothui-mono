import {
  useUnreadMessagesTotalSelect,
  useNewFollowersCountSelect,
} from '@/entities';
import { useAppSelector } from '@/shared/config/redux';
import { selectUnreadCount } from '@/entities/Notification';
import type { NavbarLinkType } from '../types';

export const useNavbarCounts = (): Partial<Record<NavbarLinkType, number>> => {
  const chatsCount = useUnreadMessagesTotalSelect()
  const friendsCount = useNewFollowersCountSelect()
  const notificationsCount = useAppSelector(selectUnreadCount)

  return {
    chats: chatsCount,
    friends: friendsCount,
    notifications: notificationsCount || undefined,
  }
}
