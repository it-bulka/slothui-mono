import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { FriendEmitterType } from './type/followersEmitter.type';
import { FollowersServerEvents } from '../ws/types/followers.events';
import { NewFriendNotification } from '../follower/dto/follower.dto';

@Injectable()
export class EventEmitterFollowersService {
  private followersEvent$ = new Subject<FriendEmitterType>();

  constructor() {}

  getEvent() {
    return this.followersEvent$.asObservable();
  }

  onNewFollower(followeeId: string, follower: NewFriendNotification) {
    this.followersEvent$.next({
      ev: FollowersServerEvents.NEW,
      data: {
        id: follower.id,
        avatarUrl: follower.avatarUrl,
        username: follower.username,
        nickname: follower.nickname,
      },
      meta: { local: true, userId: followeeId },
    });
  }

  onFollowersUpdate(actorId: string, targetId: string) {
    this.followersEvent$.next({
      ev: FollowersServerEvents.UPDATE,
      data: {
        type: 'unfollow',
        actorId,
        targetId,
      },
      meta: { local: true },
    });
  }
}
