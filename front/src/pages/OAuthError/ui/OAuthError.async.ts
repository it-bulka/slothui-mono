import { lazy, createElement } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';
import { OAuthErrorPageLoader } from './OAuthErrorPageLoader.tsx';

const OAuthErrorAsync = lazy(() => import('./OAuthError.tsx'));
export const OAuthErrorPage = withSuspense(OAuthErrorAsync, createElement(OAuthErrorPageLoader));
