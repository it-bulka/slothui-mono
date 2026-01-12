export interface UserShort {
  id: string;
  username: string;
  nickname: string;
  email?: string;
  avatarUrl?: string | null;
}

export type UserProfileStatsDto = {
  postsCount: number
  followersCount: number
  followingCount: number
}

export type UserWithStats = UserShort & UserProfileStatsDto

export interface ProfileAnalyticsDto {
  userId: string
  delta: number      // +120
  percent: number    // +8.3%
  period: 'month'
}