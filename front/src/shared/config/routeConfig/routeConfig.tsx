export enum AppRoutes {
  HOME = 'home',
  MESSAGES_ALL = 'messages_all',
  MESSAGES_WITH = 'messages_with',
  FRIENDS = 'friends',
  USER = 'user',
  USER_FRIENDS = 'user_friends',
}

export const UserRelativePaths = {
  friends: 'friends',
}

export const getHomePage = () => '/'
export const getAllMessagesPage = () => '/msgs'
export const getMessagesWithUserPage = (id: string) => `/msgs/${id}`
export const getFriendsPage = () => '/friends'
export const getUserPage = (id: string) => `/users/${id}`
export const getUserFriendsPage = (id: string) => `/users/${id}/${UserRelativePaths.friends}`

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: getHomePage(),
  [AppRoutes.MESSAGES_ALL]: getAllMessagesPage(),
  [AppRoutes.MESSAGES_WITH]: getMessagesWithUserPage(":id"),
  [AppRoutes.FRIENDS]: getFriendsPage(),
  [AppRoutes.USER]: getUserPage(":id"),
  [AppRoutes.USER_FRIENDS]: getUserFriendsPage(":id"), //relative to user
}