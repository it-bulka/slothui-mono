export type NotificationsCountersDto = {
  unreadMessagesTotal: number
  unreadMessagesByChat: Record<string, number> // chatIs -> amount
  newFollowers: number
}