export interface UserProfileDto {
  user: {
    id: string;
    nickname: string;
    username: string;
    avatarUrl?: string;
    description?: string | null;
  };
  stats: {
    followersCount: number;
    followeesCount: number;
    postsCount: number;
  };
}

export type UserProfileDtoWithRelations = UserProfileDto & {
  relation: {
    isFollower: boolean;
    isFollowee: boolean;
  };
};
