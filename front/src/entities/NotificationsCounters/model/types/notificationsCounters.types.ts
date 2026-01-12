export type UnreadMessagesByChat = Record<string, number>;

export interface NotificationsCountersEntity {
  unreadMessagesTotal: number;
  unreadMessagesByChat: UnreadMessagesByChat;
  newFollowers: number;
}

export interface NotificationsCountersState extends NotificationsCountersEntity {
  isLoading: boolean;
  error?: string;
}