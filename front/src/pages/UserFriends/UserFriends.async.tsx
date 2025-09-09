import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';

const UserFriendsAsync = lazy(() => import('./UserFriends'))
export const UserFriendsPage = withSuspense(UserFriendsAsync)