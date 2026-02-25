import { UserResponse } from '../../user/dto/user-response.dto';
import { Meta } from './common.type';

export enum NotificationEvent {
  FRIEND_REQUEST = 'friend:request',
  FRIEND_CONFIRMATION = 'friend:confirmed',
  EVENT_COMMING = 'EVENT:COMMING',
}

type FriendRequestNotification = {
  ev: NotificationEvent.FRIEND_REQUEST;
  data: UserResponse;
  meta: Meta & { userId: string };
};

type FriendConfirmationNotification = {
  ev: NotificationEvent.FRIEND_CONFIRMATION;
  data: UserResponse;
  meta: Meta & { userId: string };
};

type EventCommingNotification = {
  ev: NotificationEvent.EVENT_COMMING;
  data: { id: string; name: string; data: string };
  meta: Meta & { userId: string };
};

export type NotificationEmitterType =
  | FriendRequestNotification
  | FriendConfirmationNotification
  | EventCommingNotification;
