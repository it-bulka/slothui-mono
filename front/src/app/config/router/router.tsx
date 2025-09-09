import { RoutePaths, UserRelativePaths } from '@/shared/config/routeConfig/routeConfig.tsx';
import { createBrowserRouter } from 'react-router'
import { HomePage, MessagesPage, FriendsPage, UserPage, UserFriendsPage, MessagesAllPage } from '@/pages';
import { MainLayout, RightSidebar, UserRightSidebar } from '@/app/layouts';

export const router = createBrowserRouter([
  {
    path: RoutePaths.home,
    element: <MainLayout rightSidebar={<RightSidebar />} />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: RoutePaths.messages_all,
        element: <MessagesAllPage />
      },
      {
        path: RoutePaths.messages_with,
        element: <MessagesPage />
      },
      {
        path: RoutePaths.friends,
        element: <FriendsPage />
      }
    ]
  },
  {
    path: RoutePaths.user,
    element: <MainLayout rightSidebar={<UserRightSidebar />} />,
    children: [
      {
        index: true,
        element: <UserPage />
      },
      {
        path: UserRelativePaths.friends,
        element: <UserFriendsPage />
      },
    ]
  }
])