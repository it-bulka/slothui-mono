export type UserDTO = {
  id: string;
  username: string;
  nickname: string;
  avatarUrl: string;
};

export interface UserProfileDto {
  user: {
    id: string;
    nickname: string;
    username: string;
    avatarUrl?: string;
    bio?: string | null;
    createdAt: string;
    isEmailVerified: boolean;
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
