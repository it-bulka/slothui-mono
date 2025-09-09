export enum AppRoutes {
  HOME = 'home',
  MESSAGES = 'messages',
  FRIENDS = 'friends',
}

export const getHomePage = () => '/'
export const getMessagesPage = () => '/msgs'
export const getFriendsPage = () => '/friends'

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: getHomePage(),
  [AppRoutes.MESSAGES]: getMessagesPage(),
  [AppRoutes.FRIENDS]: getFriendsPage(),
}