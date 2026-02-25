export type FriendDto = {
  id: string;
  src: string
  username: string
  nickname: string

  isFollowee: boolean
  isFollower: boolean

  createdAt: string; // ISO
}

// NOTIFICATION

export type NewFriendNotification = {
  id: string;
  avatarUrl: string
  username: string
  nickname: string
}