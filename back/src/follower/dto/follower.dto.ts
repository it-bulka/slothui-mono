export interface FollowerResponseDto {
  followedUserId: string;
  followedUserIds: string[];
}

export type FriendDto = {
  id: string;
  src: string;
  username: string;
  nickname: string;

  isFollowing: boolean;
  isFollower: boolean;
};
