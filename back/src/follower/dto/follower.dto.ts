export interface FollowerResponseDto {
  followedUserId: string;
  followedUserIds: string[];
}

export type FriendDto = {
  id: string;
  src: string;
  username: string;
  nickname: string;

  isFollowee: boolean;
  isFollower: boolean;
  createdAt: string;
};

export type NewFriendNotification = {
  id: string;
  avatarUrl?: string | null;
  username: string;
  nickname: string;
};
