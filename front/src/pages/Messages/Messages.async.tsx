import { lazy } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';
import { MessagesLoader } from './MessagesLoader.tsx';

const MessagesAsync = lazy(() => import('./Messages'))
export const MessagesPage = withSuspense(MessagesAsync, <MessagesLoader />)