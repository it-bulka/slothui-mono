export enum AppRoutes {
  HOME = 'home',
  MESSAGES_ALL = 'messages_all',
  MESSAGES_WITH = 'messages_with',
  CHATS = 'chats',
  FRIENDS = 'friends',
  FRIENDS_SUGGESTION = 'friends_suggestions',
  USER_FRIENDS = 'user_friends',
  ME = 'me',
  STORED_POSTS = 'stored_posts',
  SETTINGS = 'settings',
  SETTINGS_PROFILE = 'settings_profile',
  SETTINGS_ACCOUNT = 'settings_account',
  SETTINGS_PRIVACY = 'settings_privacy',
  // EVENTS
  EVENT_DETAILS = 'event_details',
  // for separate layouts
  USER = 'user',
  AUTH = 'auth',

  NOT_FOUND = 'not_found'
}

export const UserRelativePaths = {
  friends: 'friends',
}

export const AuthRelativePaths = {
  login: 'login',
  register: 'register',
}

export const getHomePage = () => '/'
export const getChatsPage = () => '/chats'
export const getAllMessagesPage = () => '/msgs'
export const getMessagesWithUserPage = (id: string) => `/chats/${id}`
export const getFriendsPage = () => '/friends'
export const getFriendsSuggestionsPage = () => '/friends/suggestions'
export const getUserPage = (id: string) => `/users/${id}`
export const getUserFriendsPage = (id: string) => `/users/${id}/${UserRelativePaths.friends}`

export const getMePage = () => `/me`
export const getStoredPostsPage = () => `/me/stored`

export const getSettingsPage = () => `/settings`
export const getSettingsProfilePage = () => `/settings/profile`
export const getSettingsAccountPage = () => `/settings/account`
export const getSettingsPrivacyPage = () => `/settings/privacy`

export const getEventsDetailsPage = (id: string) => `/events/${id}`

// auth
export const getAuthLayout = () => `/auth`
export const getLoginPage = () => `/auth/login`
export const getRegisterPage = () => `/auth/register`

export const getNotFoundPage = () => `/not-found`

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: getHomePage(),
  [AppRoutes.MESSAGES_ALL]: getAllMessagesPage(),
  [AppRoutes.MESSAGES_WITH]: getMessagesWithUserPage(":id"),
  [AppRoutes.FRIENDS]: getFriendsPage(),
  [AppRoutes.FRIENDS_SUGGESTION]: getFriendsSuggestionsPage(),
  [AppRoutes.USER]: getUserPage(":id"),
  [AppRoutes.USER_FRIENDS]: getUserFriendsPage(":id"),
  [AppRoutes.ME]: getMePage(),
  [AppRoutes.STORED_POSTS]: getStoredPostsPage(),
  [AppRoutes.SETTINGS]: getSettingsPage(),
  [AppRoutes.SETTINGS_PROFILE]: getSettingsProfilePage(),
  [AppRoutes.SETTINGS_ACCOUNT]: getSettingsAccountPage(),
  [AppRoutes.SETTINGS_PRIVACY]: getSettingsPrivacyPage(),
  [AppRoutes.EVENT_DETAILS]: getEventsDetailsPage(":id"),
  [AppRoutes.CHATS]: getChatsPage(),
  //auth
  [AppRoutes.AUTH]: getAuthLayout(),
  [AppRoutes.NOT_FOUND]: getNotFoundPage()
}