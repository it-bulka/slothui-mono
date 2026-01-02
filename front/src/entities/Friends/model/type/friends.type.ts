import type { EntityState } from '@reduxjs/toolkit';
import type { UserShort } from '@/shared/types';

type FriendPage = {
  ids: string[]
  isLoading?: boolean,
  hasMore?: boolean,
  nextCursor?: string | null
}
export interface FriendsState extends EntityState<UserShort, string>{
  followersByUser: Record<string, FriendPage>;
  followingsByUser: Record<string, FriendPage>;
  suggestions: FriendPage;
}