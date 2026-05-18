import { lazy, createElement } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';
import { LoginPageLoader } from './LoginPageLoader.tsx';

const LoginAsync = lazy(() => import('./Login.tsx'));
export const LoginPage = withSuspense(LoginAsync, createElement(LoginPageLoader));