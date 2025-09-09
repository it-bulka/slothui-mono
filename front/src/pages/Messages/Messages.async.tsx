import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';

const MessagesAsync = lazy(() => import('./Messages'))
export const MessagesPage = withSuspense(MessagesAsync)