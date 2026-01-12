import type { EntityState } from '@reduxjs/toolkit';
import type { UserWithStats } from '@/shared/types';

export type UserProfile = UserWithStats & {
  fetchedAt: number
  isLoading?: boolean
  error?: string
}

export type UsersProfilesState = EntityState<UserProfile, string>
