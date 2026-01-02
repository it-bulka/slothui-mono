import type { EntityState } from '@reduxjs/toolkit';
import type { FriendDto } from '@/shared/types';

type FriendPage = {
  ids: string[]
  isLoading?: boolean,
  hasMore?: boolean,
  nextCursor?: string | null
}
export interface FriendsState extends EntityState<FriendDto, string>{
  followersByUser: Record<string, FriendPage>;
  followingsByUser: Record<string, FriendPage>;
  suggestions: FriendPage;
}