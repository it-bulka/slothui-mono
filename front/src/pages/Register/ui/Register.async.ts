import { lazy, createElement } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';
import { RegisterPageLoader } from './RegisterPageLoader.tsx';

const RegisterAsync = lazy(() => import('./Register.tsx'));
export const RegisterPage = withSuspense(RegisterAsync, createElement(RegisterPageLoader));