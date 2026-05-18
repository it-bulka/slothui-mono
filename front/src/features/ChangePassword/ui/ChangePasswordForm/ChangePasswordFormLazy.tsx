import { lazy } from 'react';
import { withSuspense } from '@/shared/libs/withSuspense';

const Form = lazy(() => import('./ChangePasswordForm'));
export const ChangePasswordFormLazy = withSuspense(Form);
