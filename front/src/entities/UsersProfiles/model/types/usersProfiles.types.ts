import type { EntityState } from '@reduxjs/toolkit';

export type UserProfile = {
  // user
  id: string;
  username: string;
  nickname: string;
  avatarUrl?: string | null;
  description?: string | null;
  // stats
  postsCount: number
  followersCount: number
  followeesCount: number
  //meta
  fetchedAt: number
  isLoading?: boolean
  error?: string
}

export type UsersProfilesState = EntityState<UserProfile, string>
