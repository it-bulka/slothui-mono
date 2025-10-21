import { lazy } from 'react';
import { withSuspense } from '@/shared/libs';

const RegisterAsync = lazy(() => import('./Register.tsx'))
export const RegisterPage = withSuspense(RegisterAsync);