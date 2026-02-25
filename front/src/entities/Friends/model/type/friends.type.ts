import type { EntityState } from '@reduxjs/toolkit';

type FriendPage = {
  ids: string[]
  isLoading?: boolean,
  hasMore?: boolean,
  nextCursor?: string | null
  error?: string

  followersLastSeenAt?: number
  lastFetchedAt?: number | null;
}

export type FriendEntity = {
  id: string;
  src?: string | null
  username: string
  nickname: string

  isFollowee: boolean
  isFollower: boolean

  followedAt: number; // timestamp -> from createdAt ISO
}

export interface FriendsState extends EntityState<FriendEntity, string>{
  followersByUser: Record<string, FriendPage>;
  followingsByUser: Record<string, FriendPage>;
  suggestions: FriendPage;
  followersLastViewedAt: number // timestamp
}