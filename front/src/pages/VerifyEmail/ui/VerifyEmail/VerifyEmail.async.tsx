import { withSuspense } from '@/shared/libs/withSuspense';
import { lazy } from 'react';
import { VerifyEmailPageLoader } from './VerifyEmailPageLoader.tsx';

const LazyVerifyEmail = lazy(() => import('./VerifyEmail.tsx'));
export const VerifyEmailPage = withSuspense(LazyVerifyEmail, <VerifyEmailPageLoader />);
