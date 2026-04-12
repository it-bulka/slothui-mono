import { UserResponse } from '../../user/dto/user-response.dto';
import { NotificationResponseDto } from '../../notifications/dto/notification-response.dto';
import { Meta } from './common.type';

export enum NotificationEvent {
  FRIEND_REQUEST = 'friend:request',
  FRIEND_CONFIRMATION = 'friend:confirmed',
  EVENT_COMMING = 'EVENT:COMMING',
  NEW_NOTIFICATION = 'notification:new',
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

type NewNotification = {
  ev: NotificationEvent.NEW_NOTIFICATION;
  data: NotificationResponseDto;
  meta: Meta & { userId: string };
};

export type NotificationEmitterType =
  | FriendRequestNotification
  | FriendConfirmationNotification
  | EventCommingNotification
  | NewNotification;
