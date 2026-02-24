import { RoutePaths, UserRelativePaths, AuthRelativePaths } from '@/shared/config/routeConfig/routeConfig.tsx';
import { createBrowserRouter } from 'react-router'
import {
  HomePage,
  MessagesPage,
  FriendsPage,
  UserPage,
  UserFriendsPage,
  MessagesAllPage,
  MePage,
  SettingsPage,
  ProfileSettingsPage,
  AccountSettingsPage,
  PrivacySettingsPage,
  LoginPage,
  RegisterPage,
  EventDetailsPage,
  ChatsPage,
  MyFriendsSuggestionsPage,
  MyEventsPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFound
} from '@/pages';
import { ErrorBoundary } from '@/shared/ui';
import {
  MainLayout,
  RightSidebar,
  //UserRightSidebar,
  AuthLayout,
  AuthRoute,
  PrivateRoute,
  AppLayout
} from '../../layouts';
import { UserRightSidebar } from '@/widgets';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: RoutePaths.home,
        element: (
          <PrivateRoute>
            <MainLayout rightSidebar={<RightSidebar />} />
          </PrivateRoute>
        ),
        errorElement: <ErrorBoundary />,
        children: [
          { index: true, element: <HomePage /> },
          { path: RoutePaths.messages_all, element: <MessagesAllPage /> },
          { path: RoutePaths.my_posts, element: <MePage /> },
          { path: RoutePaths.my_events, element: <MyEventsPage /> },
          { path: RoutePaths.messages_with, element: <MessagesPage /> },
          { path: RoutePaths.friends, element: <FriendsPage /> },
          { path: RoutePaths.friends_suggestions, element: <MyFriendsSuggestionsPage /> },
          { path: RoutePaths.settings, element: <SettingsPage /> },
          { path: RoutePaths.settings_profile, element: <ProfileSettingsPage /> },
          { path: RoutePaths.settings_account, element: <AccountSettingsPage /> },
          { path: RoutePaths.settings_privacy, element: <PrivacySettingsPage /> },
          { path: RoutePaths.event_details, element: <EventDetailsPage /> },
          { path: RoutePaths.chats, element: <ChatsPage /> },
          { path: RoutePaths.not_found, element: <NotFound /> }
        ]
      },
      {
        path: RoutePaths.user,
        element: (
          <PrivateRoute>
            <MainLayout rightSidebar={<UserRightSidebar />} />
          </PrivateRoute>
        ),
        errorElement: <ErrorBoundary />,
        children: [
          { index: true, element: <UserPage /> },
          { path: UserRelativePaths.friends, element: <UserFriendsPage /> }
        ]
      },
      {
        path: RoutePaths.auth,
        element: (
          <AuthRoute>
            <AuthLayout />
          </AuthRoute>
        ),
        errorElement: <ErrorBoundary />,
        children: [
          { path: AuthRelativePaths.login, element: <LoginPage /> },
          { path: AuthRelativePaths.register, element: <RegisterPage /> },
          { path: RoutePaths.forgot_password, element: <ForgotPasswordPage /> },
          { path: RoutePaths.reset_password, element: <ResetPasswordPage /> }
        ]
      },
      { path: RoutePaths.not_found, element: <NotFound /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);