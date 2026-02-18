import { withSuspense } from '@/shared/libs';
import { lazy } from 'react';

const LazyForgotPassword = lazy(() => import('./ForgotPassword.tsx'))
export const ForgotPasswordPage = withSuspense(LazyForgotPassword);