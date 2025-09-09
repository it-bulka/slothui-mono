import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';

const FriendsAsync = lazy(() => import("./Friends"))
export const FriendsPage = withSuspense(FriendsAsync);