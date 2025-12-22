import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';

const ChatsAsync = lazy(() => import('./ChatsPage.tsx'))
export const ChatsPage = withSuspense(ChatsAsync)