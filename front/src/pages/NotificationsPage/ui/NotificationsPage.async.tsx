import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';
import { NotificationsPageLoader } from './NotificationsPageLoader';

const NotificationsPageAsync = lazy(() => import('./NotificationsPage'));
export const NotificationsPage = withSuspense(NotificationsPageAsync, <NotificationsPageLoader />);
