export type FriendDto = {
  id: string;
  src: string
  name: string
  nickname: string

  isFollowee: boolean
  isFollower: boolean

  createdAt: string; // ISO
}