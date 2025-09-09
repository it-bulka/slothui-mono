import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';
import { createBrowserRouter } from 'react-router'
import { RootRouter } from '@/app/config/router/RootRouter.tsx'
import { HomePage, MessagesPage, FriendsPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: RoutePaths.home,
    element: <RootRouter />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: RoutePaths.messages,
        element: <MessagesPage />
      },
      {
        path: RoutePaths.friends,
        element: <FriendsPage />
      }
    ]
  }
])