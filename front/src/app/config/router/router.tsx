import { RoutePaths, UserRelativePaths, AuthRelativePaths } from '@/shared/config/routeConfig/routeConfig.tsx';
import { createBrowserRouter } from 'react-router'
import { Suspense } from 'react';
import { RightSidebarLazy } from '../../layouts/MainLayouts/blocks/currentUserRightSidebar/RightSidebar.async';
import { RightSidebarSkeleton } from '../../layouts/MainLayouts/blocks/currentUserRightSidebar/RightSidebarSkeleton.tsx';
import { UserRightSidebarLazy } from '@/widgets/UserRightSidebar/ui/UserRightSidebar.async';
import { HomePage } from '@/pages/Home';
import { MessagesPage } from '@/pages/Messages';
import { FriendsPage } from '@/pages/Friends';
import { UserPage } from '@/pages/User';
import { UserFriendsPage } from '@/pages/UserFriends';
import { MePage } from '@/pages/Me';
import { SettingsPage } from '@/pages/Settings';
import { ProfileSettingsPage } from '@/pages/ProfileSettings';
import { AccountSettingsPage } from '@/pages/AccountSettings';
import { PrivacySettingsPage } from '@/pages/PrivacySettings';
import { LoginPage } from '@/pages/Login';
import { RegisterPage } from '@/pages/Register';
import { EventDetailsPage } from '@/pages/EventDetails';
import { ChatsPage } from '@/pages/Chats';
import { MyFriendsSuggestionsPage } from '@/pages/MyFriendsSuggestions';
import { MyEventsPage } from '@/pages/MyEvents';
import { ForgotPasswordPage } from '@/pages/ForgotPassword';
import { ResetPasswordPage } from '@/pages/ResetPassword';
import { VerifyEmailPage } from '@/pages/VerifyEmail';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { ActivityPage } from '@/pages/ActivityPage';
import { LikedPage } from '@/pages/LikedPage';
import { SavedPage } from '@/pages/SavedPage';
import { NotFound } from '@/pages/NotFound';
import { PostPage } from '@/pages/PostPage';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary';
import {
  MainLayout,
  AuthLayout,
  AuthRoute,
  PrivateRoute,
  AppLayout
} from '../../layouts';

import { UserLayoutLazy } from '../../layouts/UserLayout/UserLayout.async';

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
            element: <UserLayoutLazy />,
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