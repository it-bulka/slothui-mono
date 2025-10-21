import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';

const LoginAsync = lazy(() => import('./Login.tsx'))
export const LoginPage = withSuspense(LoginAsync);