import { lazy } from 'react'
import { withSuspense } from '@/shared/libs'


const ShareContentLazy = lazy(() => import('./ShareContent.tsx'))
export const ShareContent = withSuspense(ShareContentLazy)