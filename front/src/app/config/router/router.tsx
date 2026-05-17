import { RoutePaths, UserRelativePaths, AuthRelativePaths } from '@/shared/config/routeConfig/routeConfig.tsx';
import { createBrowserRouter } from 'react-router'
import { lazy, Suspense } from 'react';
import { RightSidebarSkeleton } from '../../layouts/MainLayouts/blocks/currentUserRightSidebar/RightSidebarSkeleton.tsx';
import {
  HomePage,
  MessagesPage,
  FriendsPage,
  UserPage,
  UserFriendsPage,
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
  VerifyEmailPage,
  NotificationsPage,
  ActivityPage,
  LikedPage,
  SavedPage,
  NotFound,
  PostPage
} from '@/pages';
import { ErrorBoundary } from '@/shared/ui';
import {
  MainLayout,
  AuthLayout,
  AuthRoute,
  PrivateRoute,
  AppLayout
} from '../../layouts';

import UserLayout from '@/pages/User/ui/UserLayout.tsx';

const RightSidebarLazy = lazy(() =>
  import('../../layouts/MainLayouts/blocks/currentUserRightSidebar/RightSidebar')
    .then(m => ({ default: m.RightSidebar }))
);

const UserRightSidebarLazy = lazy(() =>
  import('@/widgets/UserRightSidebar/ui/UserRightSidebar')
    .then(m => ({ default: m.UserRightSidebar }))
);

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: RoutePaths.home,
        element: (
          <PrivateRoute>
            <MainLayout
              rightSidebar={
                <Suspense fallback={<RightSidebarSkeleton />}>
                  <RightSidebarLazy />
                </Suspense>
              }
              mobileRightSidebar={
                <Suspense fallback={null}>
                  <RightSidebarLazy compact />
                </Suspense>
              }
            />
          </PrivateRoute>
        ),
        errorElement: <ErrorBoundary />,
        children: [
          { index: true, element: <HomePage /> },
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
          { path: RoutePaths.notifications, element: <NotificationsPage /> },
          { path: RoutePaths.activity, element: <ActivityPage /> },
          { path: RoutePaths.liked, element: <LikedPage /> },
          { path: RoutePaths.saved, element: <SavedPage /> },
          { path: RoutePaths.post, element: <PostPage /> },
          { path: RoutePaths.not_found, element: <NotFound /> }
        ]
      },
      {
        path: RoutePaths.user,
        element: (
          <PrivateRoute>
            <MainLayout
              rightSidebar={
                <Suspense fallback={<RightSidebarSkeleton />}>
                  <UserRightSidebarLazy />
                </Suspense>
              }
            />
          </PrivateRoute>
        ),
        errorElement: <ErrorBoundary />,
        children: [
          {
            element: <UserLayout />,
            children: [
              { index: true, element: <UserPage /> },
              { path: UserRelativePaths.friends, element: <UserFriendsPage /> }
            ]
          }
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
          { path: RoutePaths.reset_password, element: <ResetPasswordPage /> },
          { path: RoutePaths.verify_email, element: <VerifyEmailPage /> }
        ]
      },
      { path: RoutePaths.not_found, element: <NotFound /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);