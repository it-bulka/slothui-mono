export enum FriendsServerEvents {
  NEW_FOLLOWER = 'follower:new',
  UPDATE_FOLLOWERS = 'followers:update',
}

export type FollowersUpdateData = { actorId: string, targetId: string, type: 'unfollow' };