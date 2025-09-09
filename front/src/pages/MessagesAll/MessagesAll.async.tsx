import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';

const MessagesAllAsync = lazy(() => import("./MessagesAll"))
export const MessagesAllPage = withSuspense(MessagesAllAsync)