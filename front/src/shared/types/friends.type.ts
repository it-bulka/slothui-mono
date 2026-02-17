export type FriendDto = {
  id: string;
  src: string
  username: string
  nickname: string

  isFollowee: boolean
  isFollower: boolean

  createdAt: string; // ISO
}