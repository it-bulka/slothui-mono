import { withSuspense } from '@/shared/libs';
import { lazy } from 'react';

const LazyVerifyEmail = lazy(() => import('./VerifyEmail.tsx'));
export const VerifyEmailPage = withSuspense(LazyVerifyEmail);
