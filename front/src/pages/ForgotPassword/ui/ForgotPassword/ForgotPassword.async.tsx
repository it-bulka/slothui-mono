import { withSuspense } from '@/shared/libs/withSuspense';
import { lazy } from 'react';
import { ForgotPasswordPageLoader } from './ForgotPasswordPageLoader.tsx';

const LazyForgotPassword = lazy(() => import('./ForgotPassword.tsx'));
export const ForgotPasswordPage = withSuspense(LazyForgotPassword, <ForgotPasswordPageLoader />);