export interface UserProfileDto {
  user: {
    id: string;
    nickname: string;
    username: string;
    avatarUrl?: string;
    bio?: string | null;
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
