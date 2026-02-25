import { FollowersServerEvents } from '../../ws/types/followers.events';
import { NewFriendNotification } from '../../follower/dto/follower.dto';
import { Meta } from './common.type';

type NewFriend = {
  ev: FollowersServerEvents.NEW;
  data: NewFriendNotification;
  meta: Meta & { userId: string };
};

export type UnfollowData = {
  actorId: string;
  targetId: string;
  type: 'unfollow';
};
type UpdateFollowers = {
  ev: FollowersServerEvents.UPDATE;
  data: UnfollowData;
  meta: Meta;
};

export type FriendEmitterType = NewFriend | UpdateFollowers;
