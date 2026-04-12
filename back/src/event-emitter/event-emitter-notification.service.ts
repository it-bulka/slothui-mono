import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import {
  NotificationEmitterType,
  NotificationEvent,
} from './type/notification.type';
import { UserResponse } from '../user/dto/user-response.dto';
import { NotificationResponseDto } from '../notifications/dto/notification-response.dto';

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

  emitNewNotification(
    recipientId: string,
    notification: NotificationResponseDto,
  ) {
    this.event$.next({
      ev: NotificationEvent.NEW_NOTIFICATION,
      data: notification,
      meta: { local: true, userId: recipientId },
    });
  }
}
