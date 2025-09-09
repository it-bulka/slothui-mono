export enum AppRoutes {
  HOME = 'home',
  MESSAGES = 'messages',
  FRIENDS = 'friends',
  USER = 'user',
  USER_FRIENDS = 'user_friends',
}

export const UserRelativePaths = {
  friends: 'friends',
}

export const getHomePage = () => '/'
export const getMessagesPage = () => '/msgs'
export const getFriendsPage = () => '/friends'
export const getUserPage = (id: string) => `/users/${id}`
export const getUserFriendsPage = (id: string) => `/users/${id}/${UserRelativePaths.friends}`

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: getHomePage(),
  [AppRoutes.MESSAGES]: getMessagesPage(),
  [AppRoutes.FRIENDS]: getFriendsPage(),
  [AppRoutes.USER]: getUserPage(":id"),
  [AppRoutes.USER_FRIENDS]: getUserFriendsPage(":id"), //relative to user
}