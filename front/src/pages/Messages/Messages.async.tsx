import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';
import { MessagesLoader } from './MessagesLoader.tsx';

const MessagesAsync = lazy(() => import('./Messages'))
export const MessagesPage = withSuspense(MessagesAsync, <MessagesLoader />)