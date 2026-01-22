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
  followeesCount: number
}

export type UserWithStats = {
  user: UserShort & { bio?: string | null; },
  stats: UserProfileStatsDto
}

export type OtherUserWithStats = UserWithStats & {
  relation: {
    isFollowee: boolean,
    isFollower: boolean,
  }
}

export interface ProfileAnalyticsDto {
  userId: string
  delta: number      // +120
  percent: number    // +8.3%
  period: 'month'
}