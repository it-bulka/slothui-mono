import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';
import { ChatsPageLoader } from './ChatsPageLoader.tsx';

const ChatsAsync = lazy(() => import('./ChatsPage.tsx'))
export const ChatsPage = withSuspense(ChatsAsync, <ChatsPageLoader />)