import { withSuspense } from '@/shared/libs';
import { lazy } from 'react';

const LazyResetPassword = lazy(() => import('./ResetPassword.tsx'))
export const ResetPasswordPage = withSuspense(LazyResetPassword);