import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { NotificationEmitterType } from './type/notification.type';
import { UserResponse } from '../user/dto/user-response.dto';
import { NotificationEvent } from './type/notification.type';
import { MessageResponseDto } from '../messages/dto/message.dto';

@Injectable()
export class EventEmitterNotificationService {
  event$ = new Subject<NotificationEmitterType>();

  getEvent() {
    return this.event$.asObservable();
  }

  onFriendRequest(followeeId: string, follower: UserResponse) {
    this.event$.next({
      ev: NotificationEvent.FRIEND_REQUEST,
      data: follower,
      meta: { local: true, userId: followeeId },
    });
  }

  onFriendConfirmed(followerId: string, followee: UserResponse) {
    this.event$.next({
      ev: NotificationEvent.FRIEND_CONFIRMATION,
      data: followee,
      meta: { local: true, userId: followerId },
    });
  }

  onNewMsg(msg: MessageResponseDto) {
    this.event$.next({
      ev: NotificationEvent.MSG_NEW,
      data: msg,
      meta: { local: true },
    });
  }
}
